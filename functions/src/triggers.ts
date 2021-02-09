import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'

import { deleteCollection } from './helpers/deleteCollection'
import { computeTime } from './helpers/time'
// eslint-disable-next-line no-unused-vars
import { IStatistic } from './interfaces/statistics'

// eslint-disable-next-line max-len
// type FireStoreQueryDocumentSnapshotData = FirebaseFirestore.QueryDocumentSnapshot<FirebaseFirestore.DocumentData>
// eslint-disable-next-line max-len
type FireStoreDocumentSnapshotData = FirebaseFirestore.DocumentSnapshot<FirebaseFirestore.DocumentData>
// type UserScoreKeys = `${'r' | 'h'}_co:${Count}_ma:${Match}_mo:${Mode}`
type UserData = {
  [key: string]: Score
  // [key in UserScoreKeys]: Score
} & {
  uid: string
}
interface Score {
  count: number
  score: IStatistic
}

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

      const userRef = await firestore.doc(`users/${uid}`).get()

      // Clean up the recent scores
      await userRecentScoresCleanup(uid, sid, userRef, data)

      // Clean up the high scores
      await userHighScoresCleanup(uid, userRef, data)

      // Update the newly added score
      return await snapshot.ref.set({ ...data, sid }, { merge: true })
    }
  )

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
  const userScoreData = userData[key]

  let countValue = userScoreData?.count

  if (!countValue || countValue < 10) {
    countValue = (admin.firestore.FieldValue.increment(1) as any) as number
  } else {
    if (userScoreData?.score?.sid) {
      await firestore
        .doc(`users/${uid}`)
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
  const userScoreData = userData[key]
  const dataComputed = data.computed
  const userComputed = userScoreData?.score?.computed

  let countValue = userScoreData?.count

  if (!countValue || countValue < 10) {
    countValue = (admin.firestore.FieldValue.increment(1) as any) as number

    const ref = firestore.doc(`users/${uid}`).collection('high-scores').doc()

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
    const ref = firestore.doc(`users/${uid}`).collection('high-scores').doc()
    let sid = ref.id
    const collectionRef = await firestore
      .doc(`users/${uid}`)
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
 * Replace the users' high score
 *
 * @param {string} uid User ID
 * @param {IStatistic} data Snapshot data
 * @param {FireStoreQueryDocumentSnapshotData} doc
 */
// async function userHighScoreReplace(
//   uid: string,
//   data: IStatistic,
//   doc: FireStoreQueryDocumentSnapshotData
// ): Promise<boolean> {
//   const dataComputed = data.computed
//   const docComputed = (doc.data() as IStatistic).computed

//   let isHighScore = false

//   if (dataComputed && docComputed && dataComputed < docComputed) {
//     doc.ref.delete()

//     await userHighScoreAdd(uid, data)

//     isHighScore = true
//   }

//   return isHighScore
// }

/**
 * Add the users' high score
 *
 * @param {string} uid User ID
 * @param {IStatistic} data Snapshot data
 */
// async function userHighScoreAdd(
//   uid: string,
//   data: IStatistic
// ): Promise<FirebaseFirestore.WriteResult> {
//   const ref = firestore.doc(`users/${uid}`).collection('high-scores').doc()

//   return await ref.set({ ...data, sid: ref.id }, { merge: true })
// }
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
      // const data = snapshot.data() as IStatistic
      // Clean up the high scores
      // await leaderboardScoresCleanup(data)
    }
  )

// #region Leaderboard Scores
/**
 * Clean up the leaderboard scores so only 10 items remain of the set
 *
 * @param {IStatistic} data Snapshot data
 */
// async function leaderboardScoresCleanup(data: IStatistic): Promise<void> {
//   // Get the recentScoreCollection set
//   const collectionRef = await firestore
//     .doc('leaderboard/details')
//     .collection('scores')
//     .where('count', '==', data.count)
//     .where('mode', '==', data.mode)
//     .where('match', '==', data.match)
//     .orderBy('computed', 'asc')
//     .where('computed', '>', data.computed)
//     .get()

//   if (collectionRef.size) {
//     let size = 0

//     collectionRef.forEach(
//       async (doc: FireStoreQueryDocumentSnapshotData): Promise<void> => {
//         // Make sure the collection contains 10 items
//         if (size > 1) {
//           await doc.ref.delete()
//         } else {
//           await leaderboardScoreReplace(data, doc)
//         }

//         size++
//       }
//     )
//   } else {
//     await leaderboardScoreAdd(data)
//   }
// }

/**
 * Replace the score on the leaderboard
 *
 * @param {IStatistic} data Snapshot data
 * @param {FireStoreQueryDocumentSnapshotData} doc
 */
// async function leaderboardScoreReplace(
//   data: IStatistic,
//   doc: FireStoreQueryDocumentSnapshotData
// ): Promise<void> {
//   const dataComputed = data.computed
//   const docComputed = (doc.data() as IStatistic).computed

//   if (dataComputed && docComputed && dataComputed < docComputed) {
//     doc.ref.delete()

//     await leaderboardScoreAdd(data)
//   }
// }

/**
 * Add the score to the leaderboard
 *
 * @param {IStatistic} data Snapshot data
 */
// async function leaderboardScoreAdd(
//   data: IStatistic
// ): Promise<FirebaseFirestore.WriteResult> {
//   const ref = firestore.collection('leaderboard').doc()

//   return await ref.set({ ...data, sid: ref.id }, { merge: true })
// }
// #endregion Leaderboard Scores
