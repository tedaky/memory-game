import firebase from 'firebase/app'

export interface User {
  uid: string
  email: string
  creationTime?: string
  lastSignInTime?: string
  phoneNumber?: string
  photoURL?: string
  displayName?: string
  providerData?: firebase.UserInfo[]
}
