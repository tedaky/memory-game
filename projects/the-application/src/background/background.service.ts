import { Injectable } from '@angular/core'

import { CheckForUpdateService } from '../check-for-update/check-for-update.service'
import { DeviceService } from '../device/device.service'
import { HighScoresService } from '../high-scores/high-scores.service'
import { RecentScoresService } from '../recent-scores/recent-scores.service'

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
  constructor(
    checkForUpdate: CheckForUpdateService,
    device: DeviceService,
    highScores: HighScoresService,
    recentScores: RecentScoresService
  ) {}
}
