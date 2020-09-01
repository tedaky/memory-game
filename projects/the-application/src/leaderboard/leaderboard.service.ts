import { Inject, Injectable, PLATFORM_ID } from '@angular/core'

import { DatabaseService } from '../database/database.service'
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

  /**
   * Tell whether to sort the list on construction.
   *
   * Is = `true`
   */
  protected sortOnConstruction: boolean = true

  constructor(
    @Inject(PLATFORM_ID) readonly platformId: string,
    database: DatabaseService
  ) {
    super(platformId, database)
  }
}
