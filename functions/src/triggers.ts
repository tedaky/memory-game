import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'

import { computeTime } from './helpers/time'
// eslint-disable-next-line no-unused-vars
import { IStatistic } from './interfaces/statistics'

const firestore = admin.firestore()

/**
 * Delete the Collection
 *
 * @param {string} collectionPath `string` the path of the collection
 * @param {number} batchSize `number` the size to delete at one time
 */
async function deleteCollection(
  collectionPath: string,
  batchSize: number
): Promise<void> {
  const collectionRef = firestore.collection(collectionPath)
  const query = collectionRef.orderBy('__name__').limit(batchSize)

  return new Promise(
    (resolve: (value?: any) => void, reject: (reason?: any) => void): void => {
      deleteQueryBatch(query, resolve).catch(reject)
    }
  )
}

/**
 * Delete the Query Batch
 *
 * @param {FirebaseFirestore.Query<FirebaseFirestore.DocumentData>} query
 * @param {()} resolve
 */
async function deleteQueryBatch(
  query: FirebaseFirestore.Query<FirebaseFirestore.DocumentData>,
  resolve: (value?: any) => void
) {
  const snapshot = await query.get()

  const batchSize = snapshot.size
  if (batchSize === 0) {
    // When there are no documents left, we are done
    resolve()
    return
  }

  // Delete documents in a batch
  const batch = firestore.batch()
  snapshot.docs.forEach(
    (
      // eslint-disable-next-line max-len
      doc: FirebaseFirestore.QueryDocumentSnapshot<FirebaseFirestore.DocumentData>
    ): void => {
      batch.delete(doc.ref)
    }
  )
  await batch.commit()

  // Recurse on the next process tick, to avoid
  // exploding the stack.
  process.nextTick((): void => {
    deleteQueryBatch(query, resolve)
  })
}

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

/**
 * Respond to when a user is deleted and remove the user collection
 *
 * @param user `admin.auth.UserRecord`
 * @param context `functions.EventContext`
 */
export const onDeleteUser = functions.auth.user().onDelete(
  async (
    user: admin.auth.UserRecord,
    context: functions.EventContext
  ): Promise<FirebaseFirestore.WriteResult> => {
    const userRef = firestore.doc(`users/${user.uid}`)

    await deleteCollection(`users/${user.uid}/high-scores`, 50)
    await deleteCollection(`users/${user.uid}/recent-scores`, 50)

    return userRef.delete()
  }
)

/**
 * Respond to when a user completes a game
 *
 * @param snapshot `functions.firestore.QueryDocumentSnapshot`
 * @param context `functions.EventContext`
 */
export const onCreateScore = functions.firestore
  .document('users/{uid}/recent-scores/{sid}')
  .onCreate(
    (
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

      firestore.doc(`users/${uid}`).collection('high-scores')

      return snapshot.ref.set({ ...data, sid: sid }, { merge: true })
    }
  )
