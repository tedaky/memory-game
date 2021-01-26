/* eslint-disable comma-dangle */
/* eslint-disable indent */
/* eslint-disable semi */
/* eslint-disable object-curly-spacing */
import * as functions from 'firebase-functions'

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript

export const helloWorld = functions.https.onRequest(
  (
    request: functions.https.Request,
    response: functions.Response<any>
  ): void => {
    functions.logger.info('Hello logs!', { structuredData: true })
    response.send('Hello from Firebase!')
  }
)

export const highScoresListen = functions.firestore
  .document('users/{uid}/high-scores/{sid}')
  .onCreate(
    (
      snapshot: functions.firestore.QueryDocumentSnapshot,
      context: functions.EventContext
    ): void => {
      functions.logger.info(snapshot, { structuredData: true })
      functions.logger.info(context, { structuredData: true })
      functions.logger.info(JSON.stringify(snapshot.data()), {
        structuredData: true
      })
    }
  )
