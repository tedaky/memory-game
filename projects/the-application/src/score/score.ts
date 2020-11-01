import { isPlatformBrowser } from '@angular/common'
import { EventEmitter, Inject, PLATFORM_ID } from '@angular/core'

import { AnalyticsService } from '../analytics/analytics.service'
import { createTime } from '../create-time/create-time'
import { DatabaseService } from '../database/database.service'
import { GameService } from '../game/game.service'
import { Statistic } from '../statistic/statistic'
import { Count, IStatistic, Match, Mode } from '../statistic/statistic.d'
import { isNullOrUndefined } from '../utilities/is-null-or-undefined'

/**
 * Functionality for getting, adding, sorting, removing, and clearing
 * for indexeddb and scores list.
 */
export abstract class Score {
  /**
   * Holder for `scores`
   */
  private _scores: Statistic[]

  /**
   * Indexeddb Store Name
   */
  protected storeName: string = 'defaultStore'

  /**
   * Emit a data change for material table.
   */
  public dataChange: EventEmitter<string>

  /**
   * List of scores.
   */
  public get scores(): Statistic[] {
    if (isNullOrUndefined(this._scores)) {
      this._scores = []
    } else if (!Array.isArray(this._scores)) {
      this._scores = [this._scores]
    }

    return this._scores
  }

  constructor(
    @Inject(PLATFORM_ID) readonly platformId: string,
    protected analytics: AnalyticsService,
    protected database: DatabaseService,
    protected game: GameService
  ) {
    this.dataChange = new EventEmitter<string>()

    if (isPlatformBrowser(platformId)) {
      this.getScores(0)
    }
  }

  /**
   * Get scores by game type
   *
   * @param count `Count` number of card matches
   * @param match `Match` number of cards to match
   * @param mode `Mode` mode of game
   */
  public getScoresBy(count: Count, match: Match, mode: Mode): Statistic[] {
    return this.scores.filter((score: Statistic): boolean => {
      return (
        score.count === count && score.match === match && score.mode === mode
      )
    })
  }

  /**
   * CompareFn for Statistic[] sort to order by "weight"
   *
   * @param a `Statistic` compare a
   * @param b `Statistic` compare b
   */
  private compare(a: Statistic, b: Statistic): 1 | -1 | 0 {
    let aTime: number
    let bTime: number
    let aWeight: number
    let bWeight: number

    aTime = createTime(a.complete)
    bTime = createTime(b.complete)

    aWeight = a.flips * aTime
    bWeight = b.flips * bTime

    if (aWeight > bWeight) {
      return 1
    }
    if (aWeight < bWeight) {
      return -1
    }

    if (a.flips > b.flips) {
      return 1
    }
    if (a.flips < b.flips) {
      return -1
    }

    if (aTime > bTime) {
      return -1
    }
    if (aTime < bTime) {
      return 1
    }

    return 0
  }

  /**
   * Sort scores by best score.
   */
  public sort(): Statistic[]
  /**
   * Sort scores by best score.
   *
   * @param statistics `Statistic[]` sort the provided statistics array
   */
  public sort(statistics: Statistic[]): Statistic[]
  public sort(arg1?: Statistic[]): Statistic[] {
    if (isNullOrUndefined(arg1)) {
      return this.scores.sort(this.compare)
    } else {
      return arg1.sort(this.compare)
    }
  }

  /**
   * Get scores from indexeddb then push them to scores list.
   *
   * Only On Construction.
   *
   * @param count `number` indicator of self call position < 10 otherwise throw error
   */
  private getScores(count: number): void {
    if (isNullOrUndefined(count)) {
      count = 0
    }

    if (count > 100) {
      console.error('Database took too long to initialise')
      return
    }

    this.getAll()
      .then((val: Statistic[]): void => {
        val.forEach((item: Statistic): void => {
          this.addScoreStatistic(item)
        })

        this.dataChange.emit('getAll')
      })
      .catch((error: DOMException): void => {
        if (error.message === 'Database not set') {
          window.requestAnimationFrame((): void => {
            this.getScores(++count)
          })
        } else {
          console.error(error.message)
        }
      })
  }

  /**
   * Append statistic to the scores list.
   *
   * @param statistic `Statistic` to add to scores list
   */
  public addScoreStatistic(statistic: Statistic): void {
    this.scores.push(statistic)
  }

  /**
   * Clear scores list.
   */
  public clearScores(): void {
    this.scores.splice(0, this.scores.length)
  }

  /**
   * Get from indexeddb.
   * Resolve with Statistic[].
   * Reject with error.
   */
  private getAll(): Promise<Statistic[]> {
    return new Promise(
      (
        resolve: (value: Statistic[]) => void,
        reject: (reason: DOMException) => void
      ): void => {
        if (this.database.database && this.database.ready) {
          let objectStore: IDBObjectStore
          let request: IDBRequest<IStatistic[]>

          objectStore = this.database.database
            .transaction(this.storeName, 'readonly')
            .objectStore(this.storeName)

          request = objectStore.getAll()

          request.onerror = function (event: Event): void {
            reject(this.error)
          }

          request.onsuccess = function (event: Event): void {
            let result: Statistic[]

            result = this.result.map<Statistic>(
              (val: IStatistic): Statistic => {
                return new Statistic(val)
              }
            )

            resolve(result)
          }
        } else {
          let error: DOMException

          error = new DOMException('Database not set')

          reject(error)
        }
      }
    )
  }

  /**
   * Add to indexeddb.
   * Resolve with keyID.
   * Reject with error.
   *
   * @param statistic `Statistic` to add to indexeddb
   */
  public add(statistic: Statistic): Promise<Statistic> {
    let gameState: Statistic[]
    let self: this
    let shouldAdd: boolean

    gameState = this.getScoresBy(
      statistic.count,
      statistic.match,
      statistic.mode
    )

    if (gameState.length < 10) {
      shouldAdd = true
      this.addScoreStatistic(statistic)
    } else {
      if (this.storeName === 'recentScores') {
        shouldAdd = true
        this.addScoreStatistic(statistic)
      } else {
        gameState = this.sort(gameState)

        let gameStateWeight: number
        let statisticWeight: number

        gameStateWeight = createTime(gameState[9].complete) * gameState[9].flips
        statisticWeight = createTime(statistic.complete) * statistic.flips

        if (gameStateWeight > statisticWeight) {
          shouldAdd = true
          this.addScoreStatistic(statistic)
        } else {
          shouldAdd = false
        }
      }
    }

    self = this

    return new Promise(
      (
        resolve: (value: Statistic) => void,
        reject: (reason: DOMException) => void
      ): void => {
        if (!shouldAdd) {
          if (this.storeName === 'highScores') {
            self.analytics.gtag('event', 'send_score', {
              ...Statistic.toJSON(statistic),
              isHighScore: false
            })
          }

          resolve(statistic)

          return
        }

        if (this.database.database && this.database.ready) {
          let add: IStatistic
          let objectStore: IDBObjectStore
          let request: IDBRequest<IDBValidKey>

          add = Statistic.toJSON(statistic)

          objectStore = this.database.database
            .transaction(this.storeName, 'readwrite')
            .objectStore(this.storeName)

          request = objectStore.add(add)

          request.onsuccess = function (event: Event): void {
            if (self.storeName === 'highScores') {
              self.analytics.gtag('event', 'send_score', {
                ...add,
                isHighScore: false
              })
            }

            statistic.keyID = this.result as number

            self.dataChange.emit('add')

            resolve(statistic)
          }

          request.onerror = function (event: Event): void {
            reject(this.error)
          }
        } else {
          let error: DOMException

          error = new DOMException('Database not set')

          reject(error)
        }
      }
    )
  }

  /**
   * Clear indexeddb.
   * Resolve with undefined.
   * Reject with error.
   */
  public clear(): Promise<void> {
    let self: this

    this.clearScores()

    self = this

    return new Promise(
      (
        resolve: (value: void) => void,
        reject: (reason: DOMException) => void
      ): void => {
        if (this.database.database && this.database.ready) {
          let objectStore: IDBObjectStore
          let request: IDBRequest<undefined>

          objectStore = this.database.database
            .transaction(this.storeName, 'readwrite')
            .objectStore(this.storeName)

          request = objectStore.clear()

          request.onsuccess = function (event: Event): void {
            self.dataChange.emit('clear')

            resolve(this.result)
          }

          request.onerror = function (event: Event): void {
            reject(this.error)
          }
        } else {
          let error: DOMException

          error = new DOMException('Database not set')

          reject(error)
        }
      }
    )
  }

  /**
   * Delete from indexeddb.
   * Resolve with undefined.
   * Reject with error.
   *
   * @param key `number` to remove from indexeddb
   */
  public delete(key: number): Promise<undefined> {
    let self: this

    self = this

    return new Promise(
      (
        resolve: (value: undefined) => void,
        reject: (reason: DOMException) => void
      ): void => {
        if (this.database.database && this.database.ready) {
          let objectStore: IDBObjectStore
          let request: IDBRequest<undefined>

          objectStore = this.database.database
            .transaction(this.storeName, 'readwrite')
            .objectStore(this.storeName)

          request = objectStore.delete(key)

          request.onsuccess = function (event: Event): void {
            self.dataChange.emit('delete')

            resolve(this.result)
          }

          request.onerror = function (event: Event): void {
            reject(this.error)
          }
        } else {
          let error: DOMException

          error = new DOMException('Database not set')

          reject(error)
        }
      }
    )
  }
}
