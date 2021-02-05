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
    const { displayName, email, phoneNumber, photoURL, uid } = user

    const data = {} as { [key: string]: string | FirebaseFirestore.FieldValue }

    if (displayName) {
      data.displayName = displayName
    }
    if (email) {
      data.email = email
    }
    if (phoneNumber) {
      data.phoneNumber = phoneNumber
    }
    if (photoURL) {
      data.photoURL = photoURL
    }
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
      await userRecentScoresCleanup(uid, data.count, data.mode, data.match)

      // Update the newly added score
      return await snapshot.ref.set({ ...data, sid: sid }, { merge: true })
    }
  )

/**
 * Clean up the users' recent scores so only 10 items remain of the set
 *
 * @param {string} uid User ID
 * @param {number} count Count of matches
 * @param {string} mode Mode of game
 * @param {number} match Matches for each card
 */
async function userRecentScoresCleanup(
  uid: string,
  count: number,
  mode: string,
  match: number
) {
  // Get the recentScoreCollection set
  const recentScoreCollectionRef = await firestore
    .doc(`users/${uid}`)
    .collection('recent-scores')
    .where('count', '==', count)
    .where('mode', '==', mode)
    .where('match', '==', match)
    .orderBy('creationTime', 'asc')
    // Latest is not entered into result so offset at 9 instead of 10
    .offset(9)
    .get()

  recentScoreCollectionRef.forEach(
    async (
      // eslint-disable-next-line max-len
      doc: FirebaseFirestore.QueryDocumentSnapshot<FirebaseFirestore.DocumentData>
    ): Promise<void> => {
      // Delete extra documents.
      await doc.ref.delete()
    }
  )
}
