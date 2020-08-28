import { Injectable, Inject, PLATFORM_ID } from '@angular/core'
import { isPlatformBrowser } from '@angular/common'
import { BehaviorSubject } from 'rxjs'

import { DeviceSize } from '../device-size/device-size'

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

  constructor(@Inject(PLATFORM_ID) readonly platformId: string) {
    this.deviceScreen = new BehaviorSubject<DeviceSize>(new DeviceSize(0, 0))

    if (isPlatformBrowser(platformId)) {
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
}
