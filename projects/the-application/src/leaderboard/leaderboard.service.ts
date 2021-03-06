import { Inject, Injectable, PLATFORM_ID } from '@angular/core'

import { DatabaseService } from '../database/database.service'
import { GameService } from '../game/game.service'
import { Score } from '../score/score'

/**
 * Functionality for getting, adding, sorting, removing, and clearing for indexeddb and scores list.
 *
 * Store is `leaderboard`
 */
@Injectable({
  providedIn: 'root'
})
/**
 * Functionality for getting, adding, sorting, removing, and clearing for indexeddb and scores list.
 *
 * Store is `leaderboard`
 */
export class LeaderboardService extends Score {
  /**
   * Indexeddb Store Name = `leaderboard`
   */
  protected storeName: string = 'leaderboard'

  constructor(
    @Inject(PLATFORM_ID) readonly platformId: string,
    database: DatabaseService,
    game: GameService
  ) {
    super(platformId, database, game)
  }
}
