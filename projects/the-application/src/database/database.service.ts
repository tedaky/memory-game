import { isPlatformBrowser } from '@angular/common'
import { Inject, Injectable, PLATFORM_ID } from '@angular/core'

import { Statistic } from '../statistic/statistic'
import { IStatistic } from '../statistic/statistic.d'
import { Time } from '../time/time'
import { ITime } from '../time/time.d'

/**
 * Database and database creation.
 */
@Injectable({
  providedIn: 'root'
})
/**
 * Database and database creation.
 */
export class DatabaseService {
  /**
   * Database for indexddb
   */
  public database: IDBDatabase

  /**
   * Tell that the database is ready
   */
  public ready: boolean

  constructor(@Inject(PLATFORM_ID) readonly platformId: string) {
    if (isPlatformBrowser(platformId)) {
      this.open()
        .then<void, never>((val: IDBDatabase): void => {
          this.database = val
          this.ready = true
        })
        .catch<void>((error: DOMException): void => {
          console.error(error.message)
        })
    }
  }

  /**
   * Open a connection, create a database and upgrade if needed
   */
  private open(): Promise<IDBDatabase> {
    return new Promise(
      (
        resolve: (value: IDBDatabase) => void,
        reject: (reason: DOMException) => void
      ): void => {
        let request: IDBOpenDBRequest
        let self: this

        self = this

        request = window.indexedDB.open('MemoryGame', 5)

        request.onerror = function(event: Event): void {
          this.result.close()
          reject(this.error)
        }

        request.onblocked = function(event: Event): void {
          this.result.close()
          console.log('blocked')
          console.log(event)
          console.log(this)
        }

        request.onsuccess = function(event: Event): void {
          resolve(this.result)
        }

        request.onupgradeneeded = function(event: IDBVersionChangeEvent): void {
          let database: IDBDatabase
          let request1: IDBOpenDBRequest
          let promises: Promise<IDBValidKey[]>[]

          database = this.result
          request1 = event.target as IDBOpenDBRequest
          promises = []

          /**
           * Create an object store.
           *
           * @param name `string` name of objectStore
           */
          function createObjectStore(name: string): void {
            if (!database.objectStoreNames.contains(name)) {
              database.createObjectStore(name, {
                keyPath: 'keyID',
                autoIncrement: true
              })
            } else {
              console.warn('objectStore exists: ', name)
            }
          }

          /**
           * For Case 3 and Case 4.
           *
           * Create an object store.
           *
           * @param name `string` name of objectStore and storeName
           */
          function updateCase3vCase4(name: string): Promise<IDBValidKey[]> {
            return new Promise(
              (
                resolve1: (value: IDBValidKey[]) => void,
                reject1: (reason: DOMException) => void
              ): void => {
                let objectStore: IDBObjectStore
                let request2: IDBRequest<IStatistic[]>

                objectStore = database
                  .transaction(name, 'readwrite')
                  .objectStore(name)

                request2 = objectStore.getAll()

                request2.onerror = function(event1: Event): void {
                  reject1(this.error)
                }

                request2.onsuccess = function(event1: Event): void {
                  let promises1: Promise<IDBValidKey>[]

                  promises1 = []

                  this.result.forEach((res: IStatistic): void => {
                    let promise: Promise<IDBValidKey>

                    promise = new Promise(
                      (
                        resolve2: (value: IDBValidKey) => void,
                        reject2: (reason: DOMException) => void
                      ): void => {
                        let json: IStatistic
                        let statistic: Statistic
                        let update: IDBRequest<IDBValidKey>

                        res.count = 6
                        res.match = 2
                        res.mode = 'regular'
                        res.complete = new Time(
                          ((res as unknown) as ITime).milliseconds,
                          ((res as unknown) as ITime).seconds,
                          ((res as unknown) as ITime).minutes,
                          ((res as unknown) as ITime).hours
                        )
                        res.memory = new Time()

                        statistic = new Statistic(res)
                        json = Statistic.toJSON(statistic)

                        update = objectStore.put(json)

                        update.onsuccess = function(event2: Event): void {
                          resolve2(this.result)
                        }

                        update.onerror = function(event2: Event): void {
                          reject2(this.error)
                        }
                      }
                    )

                    promises1.push(promise.catch(error => error))
                  })

                  Promise.all(promises1).then((val: IDBValidKey[]): void => {
                    resolve1(val)
                  })
                }
              }
            )
          }

          /**
           * For Case 3 and Case 4.
           *
           * Reuse complete listener for each objectStore update.
           *
           * Calls `updateCase3vCase4` and resolves/rejects
           *
           * @param name `string` name of objectStore and storeName
           */
          function completeCase3vCase4(name: string): Promise<IDBValidKey[]> {
            return new Promise(
              (
                resolve1: (value: IDBValidKey[]) => void,
                reject1: (reason: DOMException) => void
              ): void => {
                request1.transaction.addEventListener(
                  'complete',
                  (event1: Event): void => {
                    updateCase3vCase4(name)
                      .then((val: IDBValidKey[]): void => {
                        resolve1(val)
                      })
                      .catch((error: DOMException): void => {
                        reject1(error)
                      })
                  }
                )
              }
            )
          }

          database.onerror = function(event1: Event): void {
            self.ready = false
            console.log('error in upgrade')
            console.log(event1)
            console.log(this)
          }

          switch (event.oldVersion) {
            case 0:
              console.log('database upgrading to version 1')
              createObjectStore('highScores')

            case 1:
              console.log('database upgrading to version 2')
              createObjectStore('recentScores')

            case 2:
              console.log('database upgrading to version 3')
              createObjectStore('leaderboard')

            case 3:
              console.log('database upgrading to version 4')
              promises.push(
                completeCase3vCase4('highScores').catch(error => error)
              )

            case 4:
              console.log('database upgrading to version 5')
              promises.push(
                completeCase3vCase4('recentScores').catch(error => error)
              )
          }

          Promise.all(promises).then((value: IDBValidKey[][]): void => {
            value.forEach((group: IDBValidKey[], index: number): void => {
              if (group instanceof DOMException) {
                if (index === 0) {
                  console.error(`highScores error `, group)
                } else if (index === 1) {
                  console.error(`recentScores error `, group)
                }
              } else {
                group.forEach((key: IDBValidKey, index1: number): void => {
                  if (key instanceof DOMException) {
                    if (index === 0) {
                      console.error(`highScores error at ${index1} `, key)
                    } else if (index === 1) {
                      console.error(`recentScores error at ${index1} `, key)
                    }
                  }
                })
              }
            })
          })
        }
      }
    )
  }
}
