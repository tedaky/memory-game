import { Injectable } from '@angular/core'

import { HighScoresService } from '../high-scores/high-scores.service'
import { RecentScoresService } from '../recent-scores/recent-scores.service'
import { Statistic } from '../statistic/statistic'
import { Count, IStatistic, Match, Mode } from '../statistic/statistic.d'
import { ITime } from '../time/time.d'
import { isNullOrUndefined } from '../utilities/is-null-or-undefined'

interface ScoresFilter {
  gameTypes: string[]
  statistics: Statistic[][]
}

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
      this.ensureScoresLength('highScores')
    })
  }

  /**
   * Make sure the length of high scores is never more than 10.
   *
   * @param `scoreName` 'highScores' | 'recentScores'
   */
  private ensureScoresLength(scoreName: 'highScores' | 'recentScores'): void {
    let gameTypes: ScoresFilter

    gameTypes = { gameTypes: [], statistics: [] }

    gameTypes = this[scoreName].reduce<ScoresFilter>(
      (pv: ScoresFilter, cv: Statistic): ScoresFilter => {
        let types: string
        types = `${cv.mode}_${cv.match}_${cv.count}`

        if (!pv.gameTypes.includes(types)) {
          let filter: Statistic[]

          filter = this[`${scoreName}Service`].getScoresBy(
            cv.count,
            cv.match,
            cv.mode
          )

          if (scoreName !== 'recentScores') {
            filter = this[`${scoreName}Service`].sort(filter)
          }

          pv.gameTypes.push(types)
          pv.statistics.push(filter)
        }

        return pv
      },
      gameTypes
    )

    gameTypes.statistics.forEach((statistics: Statistic[]): void => {
      this.ensureGroupLength(statistics, scoreName)
    })
  }

  /**
   * ensureGroupLength recursive call
   *
   * @param statistics `Statistic[]`
   */
  private ensureGroupLength(
    statistics: Statistic[],
    scoreName: 'highScores' | 'recentScores'
  ): void {
    if (statistics.length > 10) {
      let keyID: number
      keyID = statistics.pop().keyID

      this[`${scoreName}Service`]
        .delete(keyID)
        .then((val: undefined): void => {
          let found: number

          found = this[scoreName].findIndex((score): boolean => {
            return score.keyID === keyID
          })

          if (found !== -1) {
            this[scoreName].splice(found, 1)
          }

          if (statistics.length > 10) {
            this.ensureGroupLength(statistics, scoreName)
          }
        })
        .catch((error: DOMException): void => {
          console.error(error.message)
        })
    }
  }

  /**
   * Add statistic to recent scores and remove when length is >10.
   *
   * @param statistic `Statistic` to add.
   */
  private addRecentScoreStatistic(statistic: Statistic): void {
    statistic = new Statistic(statistic)

    this.recentScoresService.add(statistic).then((val: Statistic): void => {
      this.ensureScoresLength('recentScores')
    })
  }

  /**
   * Add statistic to high scores and recent scores.
   *
   * @param statistic `Statistic` to add.
   */
  public addStatistic(statistic: Statistic): void
  /**
   * Add statistic to high scores and recent scores.
   *
   * @param statisticLike `IStatistic` to add.
   */
  public addStatistic(statisticLike: IStatistic): void
  /**
   * Add statistic to high scores and recent scores.
   *
   * @param mode `Mode` Mode
   * @param match `Match` Match
   * @param flips `number` Flips
   * @param count `Count` Count
   * @param complete `ITime` Complete
   * @param memory `ITime` Memory
   */
  public addStatistic(
    mode: Mode,
    match: Match,
    flips: number,
    count: Count,
    complete: ITime,
    memory: ITime
  ): void
  /**
   * Add statistic to high scores and recent scores.
   *
   * @param mode `Mode` Mode
   * @param match `Match` Match
   * @param flips `number` Flips
   * @param count `Count` Count
   * @param complete `ITime` Complete
   * @param memory `ITime` Memory
   * @param keyID `number` KeyID identifier for indexeddb
   */
  public addStatistic(
    mode: Mode,
    match: Match,
    flips: number,
    count: Count,
    complete: ITime,
    memory: ITime,
    keyID: number
  ): void
  /**
   * Add statistic to high scores and recent scores.
   *
   * @param mode `Mode` Mode
   * @param match `Match` Match
   * @param flips `number` Flips
   * @param count `Count` Count
   * @param completeMilliseconds `number` Complete Milliseconds
   * @param completeSeconds `number` Complete Seconds
   * @param completeMinutes `number` Complete Minutes
   * @param completeHours `number` Complete Hours
   * @param memoryMilliseconds `number` Complete Milliseconds
   * @param memorySeconds `number` Complete Seconds
   * @param memoryMinutes` number` Complete Minutes
   * @param memoryHours `number` Complete Hours
   */
  public addStatistic(
    mode: Mode,
    match: Match,
    flips: number,
    count: Count,
    completeMilliseconds: number,
    completeSeconds: number,
    completeMinutes: number,
    completeHours: number,
    memoryMilliseconds: number,
    memorySeconds: number,
    memoryMinutes: number,
    memoryHours: number
  ): void
  /**
   * Add statistic to high scores and recent scores.
   *
   * @param mode `Mode` Mode
   * @param match `Match` Match
   * @param flips `number` Flips
   * @param count `Count` Count
   * @param completeMilliseconds `number` Complete Milliseconds
   * @param completeSeconds `number` Complete Seconds
   * @param completeMinutes `number` Complete Minutes
   * @param completeHours `number` Complete Hours
   * @param memoryMilliseconds `number` Complete Milliseconds
   * @param memorySeconds `number` Complete Seconds
   * @param memoryMinutes` number` Complete Minutes
   * @param memoryHours `number` Complete Hours
   * @param keyID `number` KeyID identifier for indexeddb
   */
  public addStatistic(
    mode: Mode,
    match: Match,
    flips: number,
    count: Count,
    completeMilliseconds: number,
    completeSeconds: number,
    completeMinutes: number,
    completeHours: number,
    memoryMilliseconds: number,
    memorySeconds: number,
    memoryMinutes: number,
    memoryHours: number,
    keyID: number
  ): void
  public addStatistic(
    arg1: Mode | Statistic | IStatistic,
    arg2?: Match,
    arg3?: number,
    arg4?: Count,
    arg5?: ITime | number,
    arg6?: ITime | number,
    arg7?: number,
    arg8?: number,
    arg9?: number,
    arg10?: number,
    arg11?: number,
    arg12?: number,
    arg13?: number
  ): void {
    let value: Statistic

    if (typeof arg1 === 'string' && typeof arg5 === 'number') {
      if (isNullOrUndefined(arg13)) {
        value = new Statistic(
          arg1,
          arg2,
          arg3,
          arg4,
          arg5,
          arg6 as number,
          arg7,
          arg8,
          arg9,
          arg10,
          arg11,
          arg12
        )
      } else {
        value = new Statistic(
          arg1,
          arg2,
          arg3,
          arg4,
          arg5,
          arg6 as number,
          arg7,
          arg8,
          arg9,
          arg10,
          arg11,
          arg12,
          arg13
        )
      }
    } else if (typeof arg1 === 'string' && typeof arg5 === 'object') {
      if (isNullOrUndefined(arg7)) {
        value = new Statistic(arg1, arg2, arg3, arg4, arg5, arg6 as ITime)
      } else {
        value = new Statistic(arg1, arg2, arg3, arg4, arg5, arg6 as ITime, arg7)
      }
    } else if (arg1 instanceof Statistic) {
      value = arg1
    } else {
      value = new Statistic(arg1 as IStatistic)
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
