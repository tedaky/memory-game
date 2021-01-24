import { Injectable } from '@angular/core'
import { Router } from '@angular/router'
import { AngularFireAuth } from '@angular/fire/auth'
import {
  AngularFirestore,
  AngularFirestoreDocument
} from '@angular/fire/firestore'
import { MatDialog, MatDialogRef } from '@angular/material/dialog'
import firebase from 'firebase/app'
import { Observable, of } from 'rxjs'
import { map, shareReplay, switchMap } from 'rxjs/operators'

import { User } from '../user/user'
import { ErrorNoticeComponent } from '../error-notice/error-notice.component'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public credential: firebase.auth.UserCredential
  public user$: Observable<User>

  private get findErrorDialog(): MatDialogRef<ErrorNoticeComponent> {
    return this.dialog.openDialogs.find((log: MatDialogRef<any>): boolean => {
      return log.componentInstance instanceof ErrorNoticeComponent
    })
  }

  constructor(
    private angularFireAuth: AngularFireAuth,
    private angularFirestore: AngularFirestore,
    private dialog: MatDialog,
    private router: Router
  ) {
    this.createUser()
  }

  private createUser(): void {
    this.user$ = this.angularFireAuth.authState.pipe<User, User>(
      switchMap<firebase.User, Observable<User>>(
        (user: firebase.User): Observable<User> => {
          if (user) {
            return this.angularFirestore
              .doc<User>(`users/${user.uid}`)
              .valueChanges()
              .pipe<User, User>(
                map<User, User>(
                  (u: User): User => {
                    u.providerData = user.providerData
                    return u
                  }
                ),
                shareReplay<User>(1)
              )
          }
          return of<User>(null)
        }
      ),
      shareReplay<User>(1)
    )
  }

  private async getCredential(
    provider: firebase.auth.AuthProvider
  ): Promise<firebase.auth.UserCredential> {
    let currentUser: firebase.User
    currentUser = await this.angularFireAuth.currentUser

    if (currentUser) {
      return await currentUser.linkWithPopup(provider)
    }

    return await this.angularFireAuth.signInWithPopup(provider)
  }

  private getProvider(whichProvider: string): firebase.auth.OAuthProvider {
    if (whichProvider === 'Microsoft' || whichProvider === 'Yahoo') {
      return new firebase.auth.OAuthProvider(
        `${whichProvider.toLowerCase()}.com`
      )
    }

    return new firebase.auth[`${whichProvider}AuthProvider`]()
  }

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
    try {
      if (whichProvider) {
        let provider: firebase.auth.AuthProvider
        provider = this.getProvider(whichProvider)

        this.credential = await this.getCredential(provider)
      } else {
        this.credential = await firebase.auth().signInAnonymously()
      }

      this.findErrorDialog.close()

      return this.updateUserData(this.credential.user)
    } catch (e) {
      if (this.dialog.openDialogs.length) {
        let modal: MatDialogRef<ErrorNoticeComponent>
        modal = this.findErrorDialog

        if (modal) {
          modal.componentInstance.data.message = e.message
          modal.componentInstance.changeDetectorRef.markForCheck()
        } else {
          this.dialog.open(ErrorNoticeComponent, {
            data: { message: e.message }
          })
        }
      } else {
        this.dialog.open(ErrorNoticeComponent, { data: { message: e.message } })
      }
    }
  }

  public async signout(): Promise<boolean> {
    await this.angularFireAuth.signOut()
    this.credential = null
    return this.router.navigate(['/'])
  }
}
