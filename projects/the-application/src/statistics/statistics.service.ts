import { Injectable } from '@angular/core'

import { HighScoresService } from '../high-scores/high-scores.service'
import { RecentScoresService } from '../recent-scores/recent-scores.service'
import { Statistic } from '../statistic/statistic'
import { IStatistic } from '../statistic/statistic.d'

/**
 * Statistics Service that allows quick access to
 * `highScores` and `recentScores` and to quickly
 * add statistics and clear statistics for
 * `highScores` and `recentScores` at the same time.
 */
@Injectable({
  providedIn: 'root'
})
/**
 * Statistics Service that allows quick access to
 * `highScores` and `recentScores` and to quickly
 * add statistics and clear statistics for
 * `highScores` and `recentScores` at the same time.
 */
export class StatisticsService {
  /**
   * Receive the scores from `HighScoresService`
   */
  public get highScores(): Statistic[] {
    return this.highScoresService.scores
  }

  /**
   * Receive the scores from `RecentScoresService`
   */
  public get recentScores(): Statistic[] {
    return this.recentScoresService.scores
  }

  constructor(
    private highScoresService: HighScoresService,
    private recentScoresService: RecentScoresService
  ) {}

  /**
   * Add statistic to high scores and remove when length is >10
   *
   * @param statistic `Statistic` to add.
   */
  private addHighScoreStatistic(statistic: Statistic): void {
    statistic = new Statistic(statistic)

    this.highScoresService.add(statistic).then((val: Statistic): void => {
      this.ensureHighScoresLength()
    })
  }

  /**
   * Add statistic to recent scores and remove when length is >10.
   *
   * @param statistic `Statistic` to add.
   */
  private addRecentScoreStatistic(statistic: Statistic): void {
    statistic = new Statistic(statistic)

    this.recentScoresService.add(statistic).then((val: Statistic): void => {
      this.ensureRecentScoresLength()
    })
  }

  /**
   * Make sure the length of high scores is never more than 10.
   */
  private ensureHighScoresLength(): void {
    this.highScoresService.sort()

    if (this.highScores.length > 10) {
      this.highScoresService
        .delete(this.highScores.pop().keyID)
        .then((val: undefined): void => {
          if (this.highScores.length > 10) {
            this.ensureHighScoresLength()
          }
        })
        .catch((error: DOMException): void => {
          console.error(error.message)
        })
    }
  }

  /**
   * Make sure the length of recent scores is never more than 10.
   */
  private ensureRecentScoresLength(): void {
    if (this.recentScores.length > 10) {
      this.recentScoresService
        .delete(this.recentScores.pop().keyID)
        .then((val: undefined): void => {
          if (this.recentScores.length > 10) {
            this.ensureRecentScoresLength()
          }
        })
        .catch((error: DOMException): void => {
          console.error(error.message)
        })
    }
  }

  /**
   * Add statistic to high scores and recent scores.
   *
   * @param statistic `Statistic` to add.
   */
  public addStatistic(statistic: Statistic | IStatistic): void

  /**
   * Add statistic to high scores and recent scores.
   *
   * @param statisticLike `IStatistic` to add.
   */
  public addStatistic(statisticLike: IStatistic): void
  /**
   * Add statistic to high scores and recent scores.
   *
   * @param milliseconds `number` time of milliseconds
   * @param seconds `number` time of seconds
   * @param minutes `number` time of minutes
   * @param hours `number` time of hours
   * @param flips `number` amount of flips
   */
  public addStatistic(
    milliseconds: number,
    seconds: number,
    minutes: number,
    hours: number,
    flips: number
  ): void
  /**
   * Add statistic to high scores and recent scores.
   *
   * @param milliseconds `number` time of milliseconds
   * @param seconds `number` time of seconds
   * @param minutes `number` time of minutes
   * @param hours `number` time of hours
   * @param flips `number` amount of flips
   * @param keyID `number` identifier for indexeddb
   */
  public addStatistic(
    milliseconds: number,
    seconds: number,
    minutes: number,
    hours: number,
    flips: number,
    keyID: number
  ): void
  public addStatistic(
    arg1: number | Statistic | IStatistic,
    arg2?: number,
    arg3?: number,
    arg4?: number,
    arg5?: number,
    arg6?: number
  ): void {
    let value: Statistic

    if (typeof arg1 === 'number') {
      if (typeof arg6 === 'undefined') {
        value = new Statistic(arg1, arg2, arg3, arg4, arg5)
      } else {
        value = new Statistic(arg1, arg2, arg3, arg4, arg5, arg6)
      }
    } else if (arg1 instanceof Statistic) {
      value = arg1
    } else {
      value = new Statistic(arg1)
    }

    this.addHighScoreStatistic(value)
    this.addRecentScoreStatistic(value)
  }

  /**
   * Clear scores for High Scores and Recent Scores.
   */
  public clearStatistics(): void {
    this.highScoresService.clear()
    this.recentScoresService.clear()
  }
}
