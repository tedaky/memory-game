import { Injectable } from '@angular/core'
import { Router } from '@angular/router'
import { AngularFireAuth } from '@angular/fire/auth'
import { MatDialog, MatDialogRef } from '@angular/material/dialog'
import firebase from 'firebase/app'
import { Observable, of } from 'rxjs'
import {
  distinctUntilChanged,
  map,
  shareReplay,
  switchMap,
  take,
  tap
} from 'rxjs/operators'

import { User } from '../user/user'
import { ErrorNoticeComponent } from '../error-notice/error-notice.component'
import { redirect } from '../redirect/redirect'
import { RouteLoction } from '../route-location/route-location'

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
    private dialog: MatDialog,
    private router: Router
  ) {
    this.createUser()
  }

  private navigate(user: firebase.User): void {
    if (!user) {
      // Routes availble to Unauthenticated user
      if (
        this.router.url.includes('login') ||
        this.router.url.includes('legal')
      ) {
        // Return. No need to redirect
        return
      }
      // Go to login because user is no longer authenticated
      this.router.navigate(['/', redirect(), 'login'])
    }

    // Routes availble to Authenticated user
    if (!this.router.url.includes('login')) {
      // Return. No need to redirect
      return
    }

    // Go to game because user is Authenticated
    this.router.navigate(['/', redirect(), RouteLoction.Game])
  }

  private createUser(): void {
    this.user$ = this.angularFireAuth.user.pipe<
      firebase.User,
      User,
      User,
      User
    >(
      tap<firebase.User>((user: firebase.User): void => {
        this.navigate(user)
      }),
      switchMap<firebase.User, Observable<User>>(
        (user: firebase.User): Observable<User> => {
          if (!user) {
            return of<User>(null)
          }

          return of<firebase.User>(user).pipe<User, User, User>(
            map<User, User>(
              (u: User): User => {
                let data: User

                // Assign data
                data = {} as User
                // Extract from user
                const {
                  displayName,
                  email,
                  metadata: { creationTime, lastSignInTime },
                  providerData,
                  phoneNumber,
                  photoURL,
                  uid
                } = user

                if (displayName) {
                  data.displayName = displayName
                }
                if (email) {
                  data.email = email
                }
                if (creationTime) {
                  data.creationTime = creationTime
                }
                if (lastSignInTime) {
                  data.lastSignInTime = lastSignInTime
                }
                if (providerData) {
                  data.providerData = providerData
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

                return data ?? user
              }
            ),
            distinctUntilChanged<User>(),
            shareReplay<User>(1)
          )
        }
      ),
      distinctUntilChanged<User>(),
      shareReplay<User>(1)
    )
  }

  public async delete(): Promise<void> {
    let currentUser: firebase.User
    currentUser = await this.angularFireAuth.currentUser

    if (!currentUser) {
      return
    }

    await currentUser.delete()
  }

  public isLinkedProvider(providerId: string): Observable<boolean> {
    const isLink: Observable<boolean> = this.user$.pipe<
      boolean,
      boolean,
      boolean
    >(
      map<User, boolean>((user: User): boolean => {
        if (!user) {
          return false
        }

        const found = user.providerData.findIndex(
          (provider: firebase.UserInfo): boolean => {
            return provider.providerId === providerId
          }
        )
        return found !== -1
      }),
      distinctUntilChanged<boolean>(),
      shareReplay<boolean>(1)
    )

    return isLink
  }

  public async unlinkProvider(providerId: string): Promise<void> {
    try {
      let currentUser: firebase.User
      currentUser = await this.angularFireAuth.currentUser

      if (!currentUser) {
        return
      }

      // if (!(currentUser.providerData?.length > 1)) {
      //   return
      // }

      const found = currentUser.providerData.findIndex(
        (provider: firebase.UserInfo): boolean => {
          return provider.providerId === providerId
        }
      )

      if (found === -1) {
        return
      }

      const updatedUser = await currentUser.unlink(providerId)

      return await this.angularFireAuth.updateCurrentUser(updatedUser)
    } catch (e) {
      throw e
    }
  }

  private async getCredential(
    provider: firebase.auth.AuthProvider
  ): Promise<firebase.auth.UserCredential> {
    let currentUser: firebase.User
    currentUser = await this.angularFireAuth.currentUser

    if (currentUser) {
      // Link the provider with the current user
      return await currentUser.linkWithPopup(provider)
    }

    // Sign the user in
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

  public async providerSignin(whichProvider: string): Promise<void> {
    try {
      if (whichProvider) {
        let provider: firebase.auth.AuthProvider
        provider = this.getProvider(whichProvider)

        this.credential = await this.getCredential(provider)
      } else {
        this.credential = await firebase.auth().signInAnonymously()
      }

      if (this.findErrorDialog) {
        this.findErrorDialog.close()
      }
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

      throw e
    }
  }

  public async signout(): Promise<void> {
    await this.angularFireAuth.signOut()
    this.credential = null
  }
}
