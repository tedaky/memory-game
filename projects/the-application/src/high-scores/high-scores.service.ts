import { Inject, Injectable, PLATFORM_ID } from '@angular/core'

import { AnalyticsService } from '../analytics/analytics.service'
import { DatabaseService } from '../database/database.service'
import { GameService } from '../game/game.service'
import { Score } from '../score/score'

/**
 * Functionality for getting, adding, sorting, removing, and clearing for indexeddb and scores list.
 *
 * Store is `highScores`
 */
@Injectable({
  providedIn: 'root'
})
/**
 * Functionality for getting, adding, sorting, removing, and clearing for indexeddb and scores list.
 *
 * Store is `highScores`
 */
export class HighScoresService extends Score {
  /**
   * Indexeddb Store Name = `highScores`
   */
  protected storeName: string = 'highScores'

  constructor(
    @Inject(PLATFORM_ID) readonly platformId: string,
    analytics: AnalyticsService,
    database: DatabaseService,
    game: GameService
  ) {
    super(platformId, analytics, database, game)
  }
}
