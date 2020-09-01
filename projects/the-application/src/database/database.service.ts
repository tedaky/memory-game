import { isPlatformBrowser } from '@angular/common'
import { Inject, Injectable, PLATFORM_ID } from '@angular/core'

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
        })
        .catch<void>((error: DOMException): void => {
          console.error(error.message)
        })
      this.ready = true
    }
  }

  /**
   * Open a connection, create a database and upgrade if needed
   */
  private async open(): Promise<IDBDatabase> {
    return await new Promise(
      (
        resolve: (value: IDBDatabase) => void,
        reject: (reason: DOMException) => void
      ): void => {
        let request: IDBOpenDBRequest
        let self: this

        request = window.indexedDB.open('MemoryGame', 3)

        request.onsuccess = function(event: Event): void {
          resolve(this.result)
        }

        request.onerror = function(event: Event): void {
          reject(this.error)
        }

        self = this

        request.onupgradeneeded = function(event: IDBVersionChangeEvent): void {
          self.ready = false

          this.result.onerror = function(event1: Event): void {
            self.ready = false
            console.log('error in upgrade')
            console.log(event1)
            console.log(this)
          }

          switch (event.oldVersion) {
            case 0:
              console.log('database upgrading to version 1')
              if (!this.result.objectStoreNames.contains('highScores')) {
                this.result.createObjectStore('highScores', {
                  keyPath: 'keyID',
                  autoIncrement: true
                })
              }

            case 1:
              console.log('database upgrading to version 2')
              if (!this.result.objectStoreNames.contains('recentScores')) {
                this.result.createObjectStore('recentScores', {
                  keyPath: 'keyID',
                  autoIncrement: true
                })
              }

            case 2:
              console.log('database upgrading to version 3')
              if (!this.result.objectStoreNames.contains('leaderboard')) {
                this.result.createObjectStore('leaderboard', {
                  keyPath: 'keyID',
                  autoIncrement: true
                })
              }
          }

          self.ready = true
        }

        request.onblocked = function(event: Event): void {
          console.log('blocked')
          console.log(event)
          console.log(this)
        }
      }
    )
  }
}
