import { Inject, Injectable, PLATFORM_ID } from '@angular/core'

import { DatabaseService } from '../database/database.service'
import { GameService } from '../game/game.service'
import { Score } from '../score/score'
import { Statistic } from '../statistic/statistic'

/**
 * Functionality for getting, adding, sorting, removing, and clearing for indexeddb and scores list.
 *
 * Store is `recentScores`
 */
@Injectable({
  providedIn: 'root'
})
/**
 * Functionality for getting, adding, sorting, removing, and clearing for indexeddb and scores list.
 *
 * Store is `recentScores`
 */
export class RecentScoresService extends Score {
  /**
   * Indexeddb Store Name = `recentScores`
   */
  protected storeName: string = 'recentScores'

  constructor(
    @Inject(PLATFORM_ID) readonly platformId: string,
    database: DatabaseService,
    game: GameService
  ) {
    super(platformId, analytics, database, game)
  }

  /**
   * Prepend statistic to the scores list.
   */
  public addScoreStatistic(statistic: Statistic): void {
    this.scores.unshift(statistic)
  }
}
