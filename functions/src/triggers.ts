import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'

import { deleteCollection } from './helpers/deleteCollection'
import { computeTime } from './helpers/time'
// eslint-disable-next-line no-unused-vars
import { IStatistic } from './interfaces/statistics'
import {
  // eslint-disable-next-line no-unused-vars
  Data,
  // eslint-disable-next-line no-unused-vars
  FireStoreDocumentSnapshotData,
  // eslint-disable-next-line no-unused-vars
  Score,
  // eslint-disable-next-line no-unused-vars
  UserData
} from './interfaces/data'

/**
 * The Admin firestore
 */
const firestore = admin.firestore()

/**
 * Delete User Trigger
 */
export const onDeleteUser = functions.auth.user().onDelete(deleteUser)

/**
 * Respond to when a user is deleted and remove the user collection
 *
 * @param {admin.auth.UserRecord} user
 * @param {functions.EventContext} context
 */
async function deleteUser(
  user: admin.auth.UserRecord,
  context: functions.EventContext
): Promise<FirebaseFirestore.WriteResult> {
  // Get the firestore user document
  const userRef = firestore
    .collection('memory-game')
    .doc('details')
    .collection('users')
    .doc(user.uid)
  // Collections that the user has
  const userCollections = await userRef.listCollections()

  // If collections exists delete them
  if (userCollections.length) {
    // Loop each collection to delete
    userCollections.forEach(
      async (
        // eslint-disable-next-line max-len
        collection: FirebaseFirestore.CollectionReference<FirebaseFirestore.DocumentData>
      ): Promise<void> => {
        // Delete the collection
        await deleteCollection(
          firestore,
          `memory-game/details/users/${user.uid}/${collection.id}`,
          50
        )
      }
    )
  }

  // Finally delete the user document
  return userRef.delete()
}

/**
 * Create Recent Score Trigger
 */
export const onCreateRecentScore = functions.firestore
  .document('memory-game/details/users/{uid}/recent-scores/{sid}')
  .onCreate(createRecentScore)

/**
 * Respond to when a user completes a game
 *
 * @param {functions.firestore.QueryDocumentSnapshot} snapshot
 * @param {functions.EventContext} context
 */
async function createRecentScore(
  snapshot: functions.firestore.QueryDocumentSnapshot,
  context: functions.EventContext
): Promise<FirebaseFirestore.WriteResult> {
  // Extract properties
  const {
    params: { uid, sid }
  } = context
  const data = snapshot.data() as IStatistic
  const { createTime } = snapshot

  if (createTime) {
    data.createTime = createTime
  }
  if (uid) {
    data.uid = uid
  }

  data.computed = computeTime(data.complete, data.memory)

  const userRef = await firestore
    .collection('memory-game')
    .doc('details')
    .collection('users')
    .doc(uid)
    .get()

  // Clean up the recent scores
  await userRecentScoresCleanup(uid, sid, userRef, data)

  // Clean up the high scores
  await userHighScoresCleanup(uid, userRef, data)

  // Update the newly added score
  return await snapshot.ref.set({ ...data, sid }, { merge: true })
}

// #region Recent Scores
/**
 * Clean up the users' recent scores so only 10 items remain of the set
 *
 * @param {string} uid User ID
 * @param {string} sid Score ID
 * @param {FireStoreDocumentSnapshotData} userRef User Ref
 * @param {IStatistic} data Snapshot data
 */
async function userRecentScoresCleanup(
  uid: string,
  sid: string,
  userRef: FireStoreDocumentSnapshotData,
  data: IStatistic
): Promise<void> {
  const userData = userRef.data() as UserData
  const key = `r_co:${data.count}_ma:${data.match}_mo:${data.mode}`
  let userScoreData = {} as Score

  if (userData) {
    userScoreData = userData[key]
  }

  let countValue = userScoreData?.count

  if (!countValue || countValue < 10) {
    countValue = (admin.firestore.FieldValue.increment(1) as any) as number
  } else {
    if (userScoreData?.score?.sid) {
      await firestore
        .collection('memory-game')
        .doc('details')
        .collection('users')
        .doc(uid)
        .collection('recent-scores')
        .doc(userScoreData.score.sid as string)
        .delete()
    }
  }

  await updateUserScoreDoc(sid, userRef, data, key, countValue)
}
// #endregion Recent Scores

// #region High Scores
/**
 * Clean up the users' high scores so only 10 items remain of the set
 *
 * @param {string} uid User ID
 * @param {FireStoreDocumentSnapshotData} userRef User Ref
 * @param {IStatistic} data Snapshot data
 */
async function userHighScoresCleanup(
  uid: string,
  userRef: FireStoreDocumentSnapshotData,
  data: IStatistic
): Promise<void> {
  const userData = userRef.data() as UserData
  const key = `h_co:${data.count}_ma:${data.match}_mo:${data.mode}`

  let userScoreData = {} as Score

  if (userData) {
    userScoreData = userData[key]
  }

  const dataComputed = data.computed
  const userComputed = userScoreData?.score?.computed

  let countValue = userScoreData?.count

  if (!countValue || countValue < 10) {
    countValue = (admin.firestore.FieldValue.increment(1) as any) as number

    const ref = firestore
      .collection('memory-game')
      .doc('details')
      .collection('users')
      .doc(uid)
      .collection('high-scores')
      .doc()

    await ref.set({ ...data, sid: ref.id }, { merge: true })

    if (!dataComputed || !userComputed) {
      await updateUserScoreDoc(ref.id, userRef, data, key, countValue)
      return
    }

    if (dataComputed > userComputed) {
      await updateUserScoreDoc(ref.id, userRef, data, key, countValue)
      return
    }

    await userRef.ref.set({ [key]: { count: countValue } }, { merge: true })
    return
  }

  if (dataComputed && userComputed && dataComputed < userComputed) {
    const ref = firestore
      .collection('memory-game')
      .doc('details')
      .collection('users')
      .doc(uid)
      .collection('high-scores')
      .doc()
    let sid = ref.id
    const collectionRef = await firestore
      .collection('memory-game')
      .doc('details')
      .collection('users')
      .doc(uid)
      .collection('high-scores')
      .where('count', '==', data.count)
      .where('mode', '==', data.mode)
      .where('match', '==', data.match)
      .where('computed', '>', data.computed)
      .orderBy('computed', 'asc')
      .startAt(data.computed)
      .limitToLast(2)
      .get()

    let latest = data
    const length = collectionRef.docs.length

    if (length === 2) {
      latest = collectionRef.docs[0].data() as IStatistic
      await collectionRef.docs[1].ref.delete()
    } else {
      await collectionRef.docs[0].ref.delete()
    }

    if (latest.sid) {
      sid = latest.sid
    }

    await ref.set({ ...data, sid: ref.id }, { merge: true })

    await updateUserScoreDoc(sid, userRef, latest, key, countValue)
  }
}

/**
 * Update the User score document
 *
 * @param {string} sid Score ID
 * @param {FireStoreDocumentSnapshotData} userRef User Ref
 * @param {IStatistic} data Snapshot data
 * @param {string} key Specific key for the map
 * @param {number} count Count of documents
 */
async function updateUserScoreDoc(
  sid: string,
  userRef: FireStoreDocumentSnapshotData,
  data: IStatistic,
  key: string,
  count: number
): Promise<FirebaseFirestore.WriteResult> {
  const full = ({
    [key]: {
      score: { ...data, sid },
      count
    }
  } as any) as UserData

  return await userRef.ref.set(full, { merge: true })
}

/**
 * Update the User score document
 *
 * @param {string} sid Score ID
 * @param {FireStoreDocumentSnapshotData} leaderboardRef User Ref
 * @param {IStatistic} data Snapshot data
 * @param {string} key Specific key for the map
 * @param {number} count Count of documents
 */
async function updateLeaderboardDoc(
  sid: string,
  leaderboardRef: FireStoreDocumentSnapshotData,
  data: IStatistic,
  key: string,
  count: number
): Promise<FirebaseFirestore.WriteResult> {
  const full = ({
    [key]: {
      score: { ...data, sid },
      count
    }
  } as any) as UserData

  return await leaderboardRef.ref.set(full, { merge: true })
}
/**
 * Create High Score Trigger
 */
export const onCreateHighScore = functions.firestore
  .document('memory-game/details/users/{uid}/high-scores/{sid}')
  .onCreate(createHighScore)

/**
 * Respond to when a user completes a game
 *
 * @param {functions.firestore.QueryDocumentSnapshot} snapshot
 * @param {functions.EventContext} context
 */
async function createHighScore(
  snapshot: functions.firestore.QueryDocumentSnapshot,
  context: functions.EventContext
): Promise<void> {
  // Extract properties
  const data = snapshot.data() as IStatistic
  // Get the firestore leaderboard document
  const leaderboardRef = await firestore
    .collection('memory-game')
    .doc('details')
    .collection('leaderboard')
    .doc('details')
    .get()

  await leaderboardCleanup(leaderboardRef, data)
}

/**
 * Clean up the leaderboard scores so only 10 items remain of the set
 *
 * @param {FireStoreDocumentSnapshotData} leaderboardRef Leaderboard Ref
 * @param {IStatistic} data Snapshot data
 */
async function leaderboardCleanup(
  leaderboardRef: FireStoreDocumentSnapshotData,
  data: IStatistic
) {
  const leaderboardData = leaderboardRef.data() as Data
  const key = `co:${data.count}_ma:${data.match}_mo:${data.mode}`

  let leaderboardScoreData = {} as Score

  if (leaderboardData) {
    leaderboardScoreData = leaderboardData[key]
  }

  const dataComputed = data.computed
  const leaderboardComputed = leaderboardScoreData?.score?.computed

  let countValue = leaderboardScoreData?.count

  if (!countValue || countValue < 10) {
    countValue = (admin.firestore.FieldValue.increment(1) as any) as number

    const ref = firestore
      .collection('memory-game')
      .doc('details')
      .collection('leaderboard')
      .doc('details')
      .collection('scores')
      .doc()

    await ref.set({ ...data, sid: ref.id }, { merge: true })

    if (!dataComputed || !leaderboardComputed) {
      await updateLeaderboardDoc(ref.id, leaderboardRef, data, key, countValue)
      return
    }

    if (dataComputed > leaderboardComputed) {
      await updateLeaderboardDoc(ref.id, leaderboardRef, data, key, countValue)
      return
    }

    await leaderboardRef.ref.set(
      { [key]: { count: countValue } },
      { merge: true }
    )
    return
  }

  if (
    dataComputed &&
    leaderboardComputed &&
    dataComputed < leaderboardComputed
  ) {
    const ref = firestore
      .collection('memory-game')
      .doc('details')
      .collection('leaderboard')
      .doc('details')
      .collection('scores')
      .doc()
    let sid = ref.id
    const collectionRef = await firestore
      .collection('memory-game')
      .doc('details')
      .collection('leaderboard')
      .doc('details')
      .collection('scores')
      .where('count', '==', data.count)
      .where('mode', '==', data.mode)
      .where('match', '==', data.match)
      .where('computed', '>', data.computed)
      .orderBy('computed', 'asc')
      .startAt(data.computed)
      .limitToLast(2)
      .get()

    let latest = data
    const length = collectionRef.docs.length

    if (length === 2) {
      latest = collectionRef.docs[0].data() as IStatistic
      await collectionRef.docs[1].ref.delete()
    } else {
      await collectionRef.docs[0].ref.delete()
    }

    if (latest.sid) {
      sid = latest.sid
    }

    await ref.set({ ...data, sid: ref.id }, { merge: true })

    await updateLeaderboardDoc(sid, leaderboardRef, latest, key, countValue)
  }
}
