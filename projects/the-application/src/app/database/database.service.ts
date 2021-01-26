import { isPlatformBrowser } from '@angular/common'
import { Inject, Injectable, PLATFORM_ID } from '@angular/core'
import { MatSnackBar } from '@angular/material/snack-bar'

import { CheckForUpdateComponent } from '../check-for-update/check-for-update.component'
import { Setting } from '../setting/setting'
import { ISetting } from '../setting/setting.d'
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

  constructor(
    @Inject(PLATFORM_ID) readonly platformId: string,
    private snackBar: MatSnackBar
  ) {
    if (isPlatformBrowser(platformId)) {
      this.openDatabase(7)
    }
  }

  private openDatabase(version: number): void {
    this.open(version)
      .then<void, never>((val: IDBDatabase): void => {
        this.database = val
        this.ready = true
      })
      .catch<void>((error: DOMException): void => {
        console.error(error.message)
      })
  }

  /**
   * Create an object store if it doesn't exist.
   *
   * @param name `string` name of objectStore
   * @param database `IDBDatabase` database to create object store on
   */
  private createObjectStore(name: string, database: IDBDatabase): void
  /**
   * Create an object store.
   *
   * @param name `string` name of objectStore
   * @param database `IDBDatabase` database to create object store on
   * @param warn `boolean` warn if the object store already exists
   */
  private createObjectStore(
    name: string,
    database: IDBDatabase,
    warn: boolean
  ): void
  private createObjectStore(
    arg1: string,
    arg2: IDBDatabase,
    arg3?: boolean
  ): void {
    if (!arg2.objectStoreNames.contains(arg1)) {
      arg2.createObjectStore(arg1, {
        keyPath: 'keyID',
        autoIncrement: true
      })
    } else {
      if (arg3 === true) {
        console.warn('objectStore exists: ', arg1)
      }
    }
  }

  /**
   * Open a connection, create a database and upgrade if needed
   */
  private open(version: number): Promise<IDBDatabase> {
    return new Promise(
      (
        resolve: (value: IDBDatabase) => void,
        reject: (reason: DOMException) => void
      ): void => {
        let request: IDBOpenDBRequest
        let self: this

        self = this

        request = window.indexedDB.open('MemoryGame', version)

        request.onerror = function (event: Event): void {
          this.result.close()
          reject(this.error)
        }

        request.onblocked = function (event: Event): void {
          this.result.close()
          console.log('blocked')
          console.log(event)
          console.log(this)
        }

        request.onsuccess = function (event: Event): void {
          this.result.onversionchange = function (
            event1: IDBVersionChangeEvent
          ): void {
            self.ready = false

            console.log('versionchange')
            console.log(event1)

            self.snackBar
              .openFromComponent(CheckForUpdateComponent, {
                panelClass: 'snack-bar-reposition'
              })
              .onAction()
              .subscribe((): void => {
                window.document.location.reload()
              })

            this.close()
          }

          // tslint:disable-next-line: only-arrow-functions
          this.result.onerror = function (event1: Event): void {
            console.log('onerror')
            console.log(event1)
          }

          // Doesn't appear to be called when closed
          // tslint:disable-next-line: only-arrow-functions
          this.result.onclose = function (event1: Event): void {
            console.log('close')
            console.log(event1)
            self.ready = false
          }

          resolve(this.result)
        }

        request.onupgradeneeded = function (
          event: IDBVersionChangeEvent
        ): void {
          let database: IDBDatabase
          let newVersion: number
          let request1: IDBOpenDBRequest
          let promises: Promise<IDBValidKey[]>[]

          database = this.result
          newVersion = event.newVersion
          request1 = event.target as IDBOpenDBRequest
          promises = []

          /**
           * For Case 3 and Case 4.
           *
           * Update an object store.
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

                request2.onerror = function (event1: Event): void {
                  reject1(this.error)
                }

                request2.onsuccess = function (event1: Event): void {
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

                        update.onsuccess = function (event2: Event): void {
                          resolve2(this.result)
                        }

                        update.onerror = function (event2: Event): void {
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

          /**
           * For Case 5.
           *
           * Update an object store.
           *
           * @param name `string` name of objectStore and storeName
           */
          function updateCase5(name: string): Promise<IDBValidKey[]> {
            return new Promise(
              (
                resolve1: (value: IDBValidKey[]) => void,
                reject1: (reason: DOMException) => void
              ): void => {
                let objectStore: IDBObjectStore
                let request2: IDBRequest<ISetting[]>

                objectStore = database
                  .transaction(name, 'readwrite')
                  .objectStore(name)

                request2 = objectStore.getAll()

                request2.onerror = function (event1: Event): void {
                  reject1(this.error)
                }

                request2.onsuccess = function (event1: Event): void {
                  let names: string[]
                  let promises1: Promise<IDBValidKey>[]
                  let result: ISetting[]

                  result = this.result
                  names = ['masterVolume', 'effectsVolume', 'ambientVolume']
                  promises1 = names.reduce<Promise<IDBValidKey>[]>(
                    (
                      pv: Promise<IDBValidKey>[],
                      cv: string
                    ): Promise<IDBValidKey>[] => {
                      let found: number

                      found = result.findIndex((index: ISetting): boolean => {
                        return index.key === cv
                      })

                      if (found === -1) {
                        let promise: Promise<IDBValidKey>

                        promise = new Promise(
                          (
                            resolve2: (value: IDBValidKey) => void,
                            reject2: (reason: DOMException) => void
                          ): void => {
                            let json: ISetting
                            let setting: Setting
                            let add: IDBRequest<IDBValidKey>

                            setting = new Setting(cv, 0.5)
                            json = Setting.toJSON(setting)

                            add = objectStore.add(json)

                            add.onsuccess = function (event2: Event): void {
                              resolve2(this.result)
                            }

                            add.onerror = function (event2: Event): void {
                              reject2(this.error)
                            }
                          }
                        )

                        pv.push(promise.catch(error => error))
                      }

                      return pv
                    },
                    []
                  )

                  Promise.all(promises1).then((val: IDBValidKey[]): void => {
                    resolve1(val)
                  })
                }
              }
            )
          }

          /**
           * For Case 5.
           *
           * Reuse complete listener for each objectStore update.
           *
           * Calls `updateCase5` and resolves/rejects
           *
           * @param name `string` name of objectStore and storeName
           */
          function completeCase5(name: string): Promise<IDBValidKey[]> {
            return new Promise(
              (
                resolve1: (value: IDBValidKey[]) => void,
                reject1: (reason: DOMException) => void
              ): void => {
                request1.transaction.addEventListener(
                  'complete',
                  (event1: Event): void => {
                    updateCase5(name)
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

          /**
           * For Case 6.
           *
           * Update an object store.
           *
           * @param name `string` name of objectStore and storeName
           */
          function updateCase6(name: string): Promise<IDBValidKey[]> {
            return new Promise(
              (
                resolve1: (value: IDBValidKey[]) => void,
                reject1: (reason: DOMException) => void
              ): void => {
                let objectStore: IDBObjectStore
                let request2: IDBRequest<ISetting[]>

                objectStore = database
                  .transaction(name, 'readwrite')
                  .objectStore(name)

                request2 = objectStore.getAll()

                request2.onerror = function (event1: Event): void {
                  reject1(this.error)
                }

                request2.onsuccess = function (event1: Event): void {
                  let names: string[]
                  let promises1: Promise<IDBValidKey>[]
                  let result: ISetting[]

                  result = this.result
                  names = ['count', 'match', 'mode']
                  promises1 = names.reduce<Promise<IDBValidKey>[]>(
                    (
                      pv: Promise<IDBValidKey>[],
                      cv: string
                    ): Promise<IDBValidKey>[] => {
                      let found: number

                      found = result.findIndex((index: ISetting): boolean => {
                        return index.key === cv
                      })

                      if (found === -1) {
                        let promise: Promise<IDBValidKey>

                        promise = new Promise(
                          (
                            resolve2: (value: IDBValidKey) => void,
                            reject2: (reason: DOMException) => void
                          ): void => {
                            let json: ISetting
                            let setting: Setting
                            let add: IDBRequest<IDBValidKey>

                            switch (cv) {
                              case 'count':
                              case 'match':
                                setting = new Setting(cv, 2)
                                break
                              case 'mode':
                                setting = new Setting(cv, 'regular')
                                break
                            }

                            json = Setting.toJSON(setting)

                            add = objectStore.add(json)

                            add.onsuccess = function (event2: Event): void {
                              resolve2(this.result)
                            }

                            add.onerror = function (event2: Event): void {
                              reject2(this.error)
                            }
                          }
                        )

                        pv.push(promise.catch(error => error))
                      }

                      return pv
                    },
                    []
                  )

                  Promise.all(promises1).then((val: IDBValidKey[]): void => {
                    resolve1(val)
                  })
                }
              }
            )
          }

          /**
           * For Case 6.
           *
           * Reuse complete listener for each objectStore update.
           *
           * Calls `updateCase6` and resolves/rejects
           *
           * @param name `string` name of objectStore and storeName
           */
          function completeCase6(name: string): Promise<IDBValidKey[]> {
            return new Promise(
              (
                resolve1: (value: IDBValidKey[]) => void,
                reject1: (reason: DOMException) => void
              ): void => {
                request1.transaction.addEventListener(
                  'complete',
                  (event1: Event): void => {
                    updateCase6(name)
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

          database.onerror = function (event1: Event): void {
            self.ready = false
            console.log('error in upgrade')
            console.log(event1)
            console.log(this)
          }

          switch (event.oldVersion) {
            case 0:
              console.log('database upgrading to version 1')
              self.createObjectStore('highScores', database, true)

              if (newVersion === 1) {
                break
              }

            case 1:
              console.log('database upgrading to version 2')
              self.createObjectStore('recentScores', database, true)

              if (newVersion === 2) {
                break
              }

            case 2:
              console.log('database upgrading to version 3')
              self.createObjectStore('leaderboard', database, true)

              if (newVersion === 3) {
                break
              }

            case 3:
              console.log('database upgrading to version 4')
              promises.push(
                completeCase3vCase4('highScores').catch(error => error)
              )

              if (newVersion === 4) {
                break
              }

            case 4:
              console.log('database upgrading to version 5')
              promises.push(
                completeCase3vCase4('recentScores').catch(error => error)
              )

              if (newVersion === 5) {
                break
              }

            case 5:
              console.log('database upgrading to version 6')
              self.createObjectStore('settings', database, true)
              promises.push(completeCase5('settings').catch(error => error))

              if (newVersion === 6) {
                break
              }

            case 6:
              console.log('database upgrading to version 7')
              promises.push(completeCase6('settings').catch(error => error))

              if (newVersion === 7) {
                break
              }
          }

          Promise.all(promises).then((value: IDBValidKey[][]): void => {
            value.forEach((group: IDBValidKey[], index: number): void => {
              if (group instanceof DOMException) {
                if (index === 0) {
                  console.error(`highScores error `, group)
                } else if (index === 1) {
                  console.error(`recentScores error `, group)
                } else if (index === 2 || index === 3) {
                  console.error(`settings error `, group)
                }
              } else {
                group.forEach((key: IDBValidKey, index1: number): void => {
                  if (key instanceof DOMException) {
                    if (index === 0) {
                      console.error(`highScores error at ${index1} `, key)
                    } else if (index === 1) {
                      console.error(`recentScores error at ${index1} `, key)
                    } else if (index === 2 || index === 3) {
                      console.error(`settings error at ${index1} `, key)
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
