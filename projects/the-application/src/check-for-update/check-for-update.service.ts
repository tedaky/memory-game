import { isPlatformBrowser } from '@angular/common'
import { ApplicationRef, Inject, Injectable, PLATFORM_ID } from '@angular/core'
import { MatSnackBar } from '@angular/material/snack-bar'
import {
  SwUpdate,
  UpdateActivatedEvent,
  UpdateAvailableEvent
} from '@angular/service-worker'
import { concat, interval, Observable } from 'rxjs'
import { first } from 'rxjs/operators'

import { environment } from '../environments/environment'

/**
 * Check for app updates.
 */
@Injectable({
  providedIn: 'root'
})
/**
 * Check for app updates.
 */
export class CheckForUpdateService {
  constructor(
    @Inject(PLATFORM_ID) readonly platformId: string,
    appRef: ApplicationRef,
    snackBar: MatSnackBar,
    update: SwUpdate
  ) {
    if (
      isPlatformBrowser(platformId) &&
      environment.production &&
      update.isEnabled
    ) {
      this.available(update, snackBar)

      this.activated(update)

      this.timer(appRef, update)
    }
  }

  /**
   * Subscribe and notify when there's an available update.
   *
   * @param update `SwUpdate`
   * @param snackBar `MatSnackBar`
   */
  private available(update: SwUpdate, snackBar: MatSnackBar): void {
    update.available.subscribe((event: UpdateAvailableEvent): void => {
      this.notify(snackBar, update)
    })
  }

  /**
   * Log currently activated.
   *
   * @param update `SwUpdate`
   */
  private activated(update: SwUpdate): void {
    update.activated.subscribe((event: UpdateActivatedEvent): void => {
      if (event) {
        this.previous(event)
        this.current(event)
      }
    })
  }

  /**
   * Activate an update and reload if requested.
   *
   * @param update `SwUpdate`
   * @param reload `boolean`
   */
  private activateUpdate(update: SwUpdate, reload: boolean): void {
    update
      .activateUpdate()
      .then<void, never>((): void => {
        if (reload) {
          window.setTimeout((): void => {
            window.document.location.reload()
          }, 500)
        }
      })
      .catch<void>((e): void => {
        console.error(e)
      })
  }

  /**
   * Check for update then activate.
   *
   * @param update `SwUpdate`
   */
  private checkForUpdate(update: SwUpdate): void {
    update.checkForUpdate().catch((e): void => {
      console.error(e)
    })
  }

  /**
   * Log Current.
   *
   * @param event `UpdateActivatedEvent`
   */
  private current(event: UpdateActivatedEvent): void {
    if (event.current) {
      console.log('CURRENT')
      if (event.current.appData) {
        console.log(event.current.appData)
      }
      if (event.current.hash) {
        console.log(event.current.hash)
      }
    }
  }

  /**
   * Notify using `MatSnackBar` and reload on snackBar action.
   *
   * @param snackBar `MatSnackBar`
   * @param update `SwUpdate`
   */
  private notify(snackBar: MatSnackBar, update: SwUpdate): void {
    snackBar
      .open('Update available. Please reload.', 'Reload')
      .onAction()
      .subscribe((): void => {
        this.activateUpdate(update, true)
      })
  }

  /**
   * Log previous.
   *
   * @param event `UpdateActivatedEvent`
   */
  private previous(event: UpdateActivatedEvent): void {
    if (event.previous) {
      console.log('PREVIOUS')
      if (event.previous.appData) {
        console.log(event.previous.appData)
      }
      if (event.previous.hash) {
        console.log(event.previous.hash)
      }
    }
  }

  /**
   * Start a timer for checking updates once the app is stable.
   *
   * @param appRef `ApplicationRef`
   * @param update `SwUpdate`
   */
  private timer(appRef: ApplicationRef, update: SwUpdate): void {
    let appIsStable$: Observable<boolean>
    let everyTenMinutes$: Observable<number>
    let everyTenMinutesOnceAppIsStable$: Observable<number | boolean>

    appIsStable$ = appRef.isStable.pipe<boolean>(
      first<boolean, boolean>((isStable: boolean): boolean => {
        return isStable === true
      })
    )

    everyTenMinutes$ = interval(10 * 60 * 1000)
    everyTenMinutesOnceAppIsStable$ = concat<
      Observable<boolean>,
      Observable<number>
    >(appIsStable$, everyTenMinutes$)

    everyTenMinutesOnceAppIsStable$.subscribe((val: number | boolean): void => {
      this.checkForUpdate(update)
    })
  }
}
