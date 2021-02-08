import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'

import { deleteCollection } from './helpers/deleteCollection'
import { computeTime } from './helpers/time'
// eslint-disable-next-line no-unused-vars
import { IStatistic } from './interfaces/statistics'

// eslint-disable-next-line max-len
type FireStoreDocumentSnapshotData = FirebaseFirestore.QueryDocumentSnapshot<FirebaseFirestore.DocumentData>

const firestore = admin.firestore()

/**
 * Respond to when a user is created and add aditional information
 *
 * @param {admin.auth.UserRecord} user
 * @param {functions.EventContext} context
 */
export const onCreateUser = functions.auth.user().onCreate(
  (
    user: admin.auth.UserRecord,
    context: functions.EventContext
  ): Promise<FirebaseFirestore.WriteResult> => {
    const userRef = firestore.doc(`users/${user.uid}`)
    const { uid } = user

    const data = {} as { [key: string]: string | FirebaseFirestore.FieldValue }

    if (uid) {
      data.uid = uid
    }

    return userRef.set(data, { merge: true })
  }
)

/**
 * Respond to when a user is deleted and remove the user collection
 *
 * @param {admin.auth.UserRecord} user
 * @param {functions.EventContext} context
 */
export const onDeleteUser = functions.auth.user().onDelete(
  async (
    user: admin.auth.UserRecord,
    context: functions.EventContext
  ): Promise<FirebaseFirestore.WriteResult> => {
    const userRef = firestore.doc(`users/${user.uid}`)
    const userCollections = await userRef.listCollections()

    if (userCollections.length) {
      userCollections.forEach(
        async (
          // eslint-disable-next-line max-len
          collection: FirebaseFirestore.CollectionReference<FirebaseFirestore.DocumentData>
        ): Promise<void> => {
          await deleteCollection(
            firestore,
            `users/${user.uid}/${collection.id}`,
            50
          )
        }
      )
    }

    return userRef.delete()
  }
)

/**
 * Respond to when a user completes a game
 *
 * @param {functions.firestore.QueryDocumentSnapshot} snapshot
 * @param {functions.EventContext} context
 */
export const onCreateRecentScore = functions.firestore
  .document('users/{uid}/recent-scores/{sid}')
  .onCreate(
    async (
      snapshot: functions.firestore.QueryDocumentSnapshot,
      context: functions.EventContext
    ): Promise<FirebaseFirestore.WriteResult> => {
      const {
        params: { uid, sid },
        timestamp: creationTime
      } = context
      const data = snapshot.data() as IStatistic

      if (creationTime) {
        data.creationTime = creationTime
      }
      if (uid) {
        data.uid = uid
      }

      data.computed = computeTime(data.complete, data.memory)

      // Clean up the recent scores
      await userRecentScoresCleanup(uid, data)

      // Clean up the high scores
      await userHighScoresCleanup(uid, data)

      // Update the newly added score
      return await snapshot.ref.set({ ...data, sid }, { merge: true })
    }
  )

/**
 * Clean up the users' recent scores so only 10 items remain of the set
 *
 * @param {string} uid User ID
 * @param {IStatistic} data Snapshot data
 */
async function userRecentScoresCleanup(
  uid: string,
  data: IStatistic
): Promise<void> {
  // Get the recentScoreCollection set
  const collectionRef = await firestore
    .doc(`users/${uid}`)
    .collection('recent-scores')
    .where('count', '==', data.count)
    .where('mode', '==', data.mode)
    .where('match', '==', data.match)
    .orderBy('creationTime', 'asc')
    // Latest is not entered into result so offset at 9 instead of 10
    .offset(9)
    .get()

  collectionRef.forEach(
    async (doc: FireStoreDocumentSnapshotData): Promise<void> => {
      // Delete extra documents.
      await doc.ref.delete()
    }
  )
}

// #region High Scores
/**
 * Clean up the users' high scores so only 10 items remain of the set
 *
 * @param {string} uid User ID
 * @param {IStatistic} data Snapshot data
 */
async function userHighScoresCleanup(
  uid: string,
  data: IStatistic
): Promise<void> {
  // Get the recentScoreCollection set
  const collectionRef = await firestore
    .doc(`users/${uid}`)
    .collection('high-scores')
    .where('count', '==', data.count)
    .where('mode', '==', data.mode)
    .where('match', '==', data.match)
    .orderBy('computed', 'asc')
    .offset(9)
    .get()

  if (collectionRef.size) {
    let size = 0

    collectionRef.forEach(
      async (doc: FireStoreDocumentSnapshotData): Promise<void> => {
        // Make sure the collection contains 10 items
        if (size > 1) {
          await doc.ref.delete()
        } else {
          await userHighScoreReplace(uid, data, doc)
        }

        size++
      }
    )
  } else {
    await userHighScoreAdd(uid, data)
  }
}

/**
 * Replace the users' high score
 *
 * @param {string} uid User ID
 * @param {IStatistic} data Snapshot data
 * @param {FireStoreDocumentSnapshotData} doc
 */
async function userHighScoreReplace(
  uid: string,
  data: IStatistic,
  doc: FireStoreDocumentSnapshotData
): Promise<boolean> {
  const dataComputed = data.computed
  const docComputed = (doc.data() as IStatistic).computed

  let isHighScore = false

  if (dataComputed && docComputed && dataComputed < docComputed) {
    doc.ref.delete()

    await userHighScoreAdd(uid, data)

    isHighScore = true
  }

  return isHighScore
}

/**
 * Add the users' high score
 *
 * @param {string} uid User ID
 * @param {IStatistic} data Snapshot data
 */
async function userHighScoreAdd(
  uid: string,
  data: IStatistic
): Promise<FirebaseFirestore.WriteResult> {
  const ref = firestore.doc(`users/${uid}`).collection('high-scores').doc()

  return await ref.set({ ...data, sid: ref.id }, { merge: true })
}
// #endregion High Scores

/**
 * Respond to when a user completes a game
 *
 * @param {functions.firestore.QueryDocumentSnapshot} snapshot
 * @param {functions.EventContext} context
 */
export const onCreateHighScore = functions.firestore
  .document('users/{uid}/high-scores/{sid}')
  .onCreate(
    async (
      snapshot: functions.firestore.QueryDocumentSnapshot,
      context: functions.EventContext
    ): Promise<void> => {
      const data = snapshot.data() as IStatistic

      // Clean up the high scores
      await leaderboardScoresCleanup(data)
    }
  )

// #region Leaderboard Scores
/**
 * Clean up the leaderboard scores so only 10 items remain of the set
 *
 * @param {IStatistic} data Snapshot data
 */
async function leaderboardScoresCleanup(data: IStatistic): Promise<void> {
  // Get the recentScoreCollection set
  const collectionRef = await firestore
    .collection('leaderboard')
    .where('count', '==', data.count)
    .where('mode', '==', data.mode)
    .where('match', '==', data.match)
    .orderBy('computed', 'asc')
    .offset(9)
    .get()

  if (collectionRef.size) {
    let size = 0

    collectionRef.forEach(
      async (doc: FireStoreDocumentSnapshotData): Promise<void> => {
        // Make sure the collection contains 10 items
        if (size > 1) {
          await doc.ref.delete()
        } else {
          await leaderboardScoreReplace(data, doc)
        }

        size++
      }
    )
  } else {
    await leaderboardScoreAdd(data)
  }
}

/**
 * Replace the score on the leaderboard
 *
 * @param {IStatistic} data Snapshot data
 * @param {FireStoreDocumentSnapshotData} doc
 */
async function leaderboardScoreReplace(
  data: IStatistic,
  doc: FireStoreDocumentSnapshotData
): Promise<void> {
  const dataComputed = data.computed
  const docComputed = (doc.data() as IStatistic).computed

  if (dataComputed && docComputed && dataComputed < docComputed) {
    doc.ref.delete()

    await leaderboardScoreAdd(data)
  }
}

/**
 * Add the score to the leaderboard
 *
 * @param {IStatistic} data Snapshot data
 */
async function leaderboardScoreAdd(
  data: IStatistic
): Promise<FirebaseFirestore.WriteResult> {
  const ref = firestore.collection('leaderboard').doc()

  return await ref.set({ ...data, sid: ref.id }, { merge: true })
}
// #endregion Leaderboard Scores
