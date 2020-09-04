import { isPlatformBrowser } from '@angular/common'
import { Injectable, Inject, PLATFORM_ID } from '@angular/core'
import { MatSnackBar } from '@angular/material/snack-bar'
import { BehaviorSubject } from 'rxjs'

import { DeviceSize } from '../device-size/device-size'
import { InstallComponent } from '../install/install.component'
import { BeforeInstallPromptEvent } from '../polyfills/before-install-prompt.event'

/**
 * Service for device information.
 */
@Injectable({
  providedIn: 'root'
})
/**
 * Service for device information.
 */
export class DeviceService {
  /**
   * Observable for device size.
   */
  public deviceScreen: BehaviorSubject<DeviceSize>

  constructor(
    @Inject(PLATFORM_ID) readonly platformId: string,
    snackBar: MatSnackBar
  ) {
    this.deviceScreen = new BehaviorSubject<DeviceSize>(new DeviceSize(0, 0))

    if (isPlatformBrowser(platformId)) {
      this.install(snackBar)
      this.emitResizeFirst()
      this.createResizeListener()
      this.beforeunload()
    }
  }

  /**
   * Create a resize listener.
   */
  private createResizeListener(): void {
    window.addEventListener(
      'resize',
      (event: UIEvent) => {
        let emit: DeviceSize
        let height: number
        let width: number

        height = (event.target as Window).screen.height
        width = (event.target as Window).screen.width
        emit = new DeviceSize(height, width)

        this.deviceScreen.next(emit)
      },
      false
    )
  }

  /**
   * The first size emitter.
   */
  private emitResizeFirst(): void {
    let emit: DeviceSize
    let height: number
    let width: number

    height = window.screen.height
    width = window.screen.width
    emit = new DeviceSize(height, width)

    this.deviceScreen.next(emit)
  }

  /**
   * Remove localstorage scroll when the app
   * closes to prevent scrolling upon open.
   */
  private beforeunload(): void {
    window.addEventListener(
      'beforeunload',
      (event: BeforeUnloadEvent): void => {
        window.localStorage.removeItem('scroll')
      }
    )
  }

  /**
   * Prompt to install the PWA
   *
   * @param snackBar `MatSnackBar` prompt
   */
  private install(snackBar: MatSnackBar): void {
    if (isPlatformBrowser(this.platformId)) {
      window.addEventListener(
        'beforeinstallprompt',
        (event: BeforeInstallPromptEvent): void => {
          event.preventDefault()

          let deferredPrompt: BeforeInstallPromptEvent

          deferredPrompt = event

          snackBar
            .openFromComponent<InstallComponent>(InstallComponent, {
              panelClass: 'snack-bar-reposition'
            })
            .onAction()
            .subscribe((): void => {
              deferredPrompt.prompt()
            })
        }
      )
    }
  }
}
