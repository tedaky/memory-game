import { Injectable } from '@angular/core'

import { CheckForUpdateService } from '../check-for-update/check-for-update.service'
import { DeviceService } from '../device/device.service'

/**
 * Background service simply used to gather injectables with no calls.
 */
@Injectable({
  providedIn: 'root'
})
/**
 * Background service simply used to gather injectables with no calls.
 */
export class BackgroundService {
  constructor(device: DeviceService, checkForUpdate: CheckForUpdateService) {}
}
