import { Injectable } from '@angular/core'

import { CheckForUpdateService } from '../check-for-update/check-for-update.service'
import { DatabaseService } from '../database/database.service'
import { DeviceService } from '../device/device.service'
import { LeaderboardService } from '../leaderboard/leaderboard.service'
import { GameService } from '../game/game.service'
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
    database: DatabaseService,
    device: DeviceService,
    game: GameService,
    highScores: HighScoresService,
    leaderboard: LeaderboardService,
    recentScores: RecentScoresService
  ) {
    this.webWorker()
  }

  private webWorker(): void {
    if (typeof Worker !== 'undefined') {
      let worker: Worker

      worker = new Worker('../root/root.worker', { type: 'module' })

      worker.onmessage = (event: MessageEvent): void => {
        console.log(`page got message: "${event.data}"`)
      }

      worker.postMessage('Hello!')
    }
  }
}
