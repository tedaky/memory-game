import { Injectable } from '@angular/core'
import { Router } from '@angular/router'
import { AngularFireAuth } from '@angular/fire/auth'
import {
  AngularFirestore,
  AngularFirestoreDocument
} from '@angular/fire/firestore'
import firebase from 'firebase/app'
import { Observable, of } from 'rxjs'
import { switchMap } from 'rxjs/operators'

interface User {
  uid: string
  email: string
  photoURL?: string
  displayName?: string
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private credential: firebase.auth.UserCredential

  public user$: Observable<User> = this.angularFireAuth.authState.pipe<User>(
    switchMap<firebase.User, Observable<User>>(
      (user: firebase.User): Observable<User> => {
        if (user) {
          return this.angularFirestore
            .doc<User>(`users/${user.uid}`)
            .valueChanges()
        }
        return of(null)
      }
    )
  )

  constructor(
    private angularFireAuth: AngularFireAuth,
    private angularFirestore: AngularFirestore
  ) {}

  private updateUserData(user: firebase.User): Promise<void> {
    let userRef: AngularFirestoreDocument<User>
    let data: User

    userRef = this.angularFirestore.doc<User>(`users/${user.uid}`)

    data = {
      displayName: user.displayName,
      email: user.email,
      photoURL: user.photoURL,
      uid: user.uid
    }

    return userRef.set(data, { merge: true })
  }

  public async providerSignin(whichProvider: string): Promise<void> {
    let provider: firebase.auth.AuthProvider
    if (whichProvider) {
      if (whichProvider === 'Microsoft') {
        provider = new firebase.auth.OAuthProvider('microsoft.com')
      } else {
        provider = new firebase.auth[`${whichProvider}AuthProvider`]()
      }
      this.credential = await this.angularFireAuth.signInWithPopup(provider)
    } else {
      this.credential = await firebase.auth().signInAnonymously()
    }

    return this.updateUserData(this.credential.user)
  }

  public async signout(): Promise<void> {
    return await this.angularFireAuth.signOut()
  }
}
