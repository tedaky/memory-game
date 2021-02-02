import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'

import { computeTime } from './helpers/time'
import { IStatistic } from './interfaces/statistics'

export const firestore = admin.firestore()

/**
 * Respond to when a user is created and add aditional information
 *
 * @param user `admin.auth.UserRecord`
 * @param context `functions.EventContext`
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

      const highScoreRef = firestore
        .doc(`users/${uid}`)
        .collection('high-scores')
        .doc()

      highScoreRef.set({ ...data, sid: highScoreRef.id }, { merge: true })

      firestore.doc(`users/${uid}`).collection(`high-scores`)

      return snapshot.ref.set({ ...data, sid: sid }, { merge: true })
    }
  )
