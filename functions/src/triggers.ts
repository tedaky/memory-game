import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'

import { deleteCollection } from './helpers/deleteCollection'
import { computeTime } from './helpers/time'
// eslint-disable-next-line no-unused-vars
import { IStatistic } from './interfaces/statistics'

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
export const onCreateScore = functions.firestore
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

      // Test highScores
      // await userHighScoresCleanup(uid, data)

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
    async (
      // eslint-disable-next-line max-len
      doc: FirebaseFirestore.QueryDocumentSnapshot<FirebaseFirestore.DocumentData>
    ): Promise<void> => {
      // Delete extra documents.
      await doc.ref.delete()
    }
  )
}

/**
 * Clean up the users' high scores so only 10 items remain of the set
 *
 * @param {string} uid User ID
 * @param {IStatistic} data Snapshot data
 */
async function userHighScoresCleanup(
  uid: string,
  data: IStatistic
): Promise<FirebaseFirestore.WriteResult> {
  // Get the recentScoreCollection set
  const collectionRef = await firestore
    .doc(`users/${uid}`)
    .collection('high-scores')
    .where('count', '==', data.count)
    .where('mode', '==', data.mode)
    .where('match', '==', data.match)
    .orderBy('computed', 'asc')
    .offset(10)
    .get()

  if (collectionRef.size > 1) {
    let size = 0

    collectionRef.forEach(
      async (
        // eslint-disable-next-line max-len
        doc: FirebaseFirestore.QueryDocumentSnapshot<FirebaseFirestore.DocumentData>
      ): Promise<void> => {
        // Make sure the collection contains 10 items
        if (size > 1) {
          await doc.ref.delete()
        }
        size++
        // Delete extra documents.
        // await doc.ref.delete()
        console.log(doc.data())
      }
    )
  }


  const highScoreRef = firestore
    .doc(`users/${uid}`)
    .collection('high-scores')
    .doc()

  return await highScoreRef.set(
    { ...data, sid: highScoreRef.id },
    { merge: true }
  )
}
