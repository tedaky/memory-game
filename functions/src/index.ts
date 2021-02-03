// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript

import * as admin from 'firebase-admin'

import { production, databaseURL } from './environment'

if (production) {
  admin.initializeApp()
} else {
  const serviceAccount = require('../adminsdk.key.json')
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL
  })
}

export * from './triggers'
