import { isPlatformBrowser } from '@angular/common'
import { Inject, Injectable, PLATFORM_ID } from '@angular/core'

import { CheckForUpdateService } from '../check-for-update/check-for-update.service'
import { DatabaseService } from '../database/database.service'
import { DeviceService } from '../device/device.service'
import { LeaderboardService } from '../leaderboard/leaderboard.service'
import { GameService } from '../game/game.service'
import { HighScoresService } from '../high-scores/high-scores.service'
import { RecentScoresService } from '../recent-scores/recent-scores.service'
import { SettingsService } from '../settings/settings.service'
import { isNullOrUndefined } from '../utilities/is-null-or-undefined'

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
    @Inject(PLATFORM_ID) readonly platformId: string,
    checkForUpdate: CheckForUpdateService,
    database: DatabaseService,
    device: DeviceService,
    game: GameService,
    highScores: HighScoresService,
    leaderboard: LeaderboardService,
    recentScores: RecentScoresService,
    settings: SettingsService
  ) {
    this.webWorker(platformId)
  }

  private webWorker(platformId: string): void {
    if (isPlatformBrowser(platformId)) {
      if (!isNullOrUndefined(Worker)) {
        let worker: Worker

        worker = new Worker('../root/root.worker', { type: 'module' })

        worker.onmessage = (event: MessageEvent): void => {
          console.log(`page got message: "${event.data}"`)
        }

        worker.postMessage('Hello!')
      }
    }
  }
}
