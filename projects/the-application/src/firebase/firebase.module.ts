import { NgModule, Optional, SkipSelf } from '@angular/core'
import {
  AngularFireAuthModule,
  USE_EMULATOR as USE_AUTH_EMULATOR
} from '@angular/fire/auth'
import { AngularFireModule } from '@angular/fire'
import {
  AngularFirestoreModule,
  USE_EMULATOR as USE_FIRESTORE_EMULATOR
} from '@angular/fire/firestore'

import { environment } from '../environments/environment'

/**
 * On reload the application doesn't use the Firebase emulator. See
 * [GitHub](https://github.com/angular/angularfire/issues/2736#issuecomment-765690241)
 *
 * Also see:
 * * [firebase/firebase-js-sdk - 4110](https://github.com/firebase/firebase-js-sdk/issues/4110)
 * * [angular/angularfire - 2656](https://github.com/angular/angularfire/issues/2656)
 */
@NgModule({
  imports: [
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule.enablePersistence({ synchronizeTabs: true })
  ],
  exports: [AngularFireAuthModule, AngularFireModule, AngularFirestoreModule],
  providers: [
    {
      provide: USE_AUTH_EMULATOR,
      useValue: environment.useEmulator ? ['localhost', 9099] : undefined
    },
    {
      provide: USE_FIRESTORE_EMULATOR,
      useValue: environment.useEmulator ? ['localhost', 8081] : undefined
    }
  ]
})
export class FirebaseModule {
  constructor(@Optional() @SkipSelf() parentModule?: FirebaseModule) {
    if (parentModule) {
      throw new Error(
        'FirebaseModule is already loaded. Import it in the RootModule only.'
      )
    }
  }
}
