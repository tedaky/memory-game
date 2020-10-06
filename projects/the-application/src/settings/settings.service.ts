import { isPlatformBrowser } from '@angular/common'
import { Inject, Injectable, PLATFORM_ID } from '@angular/core'
import { interval } from 'rxjs'
import { take } from 'rxjs/operators'

import { DatabaseService } from '../database/database.service'
import { GameService } from '../game/game.service'
import { Setting } from '../setting/setting'
import { ISetting } from '../setting/setting.d'
import { isNullOrUndefined } from '../utilities/is-null-or-undefined'

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  /**
   * Holder for `settings`
   */
  private _settings: Setting[]

  /**
   * Indexeddb Store Name
   */
  private storeName: string = 'settings'

  /**
   * List of settings.
   */
  public get settings(): Setting[] {
    if (isNullOrUndefined(this._settings)) {
      this._settings = []
    } else if (!Array.isArray(this._settings)) {
      this._settings = [this._settings]
    }

    return this._settings
  }

  constructor(
    @Inject(PLATFORM_ID) readonly platformId: string,
    private database: DatabaseService,
    private game: GameService
  ) {
    if (isPlatformBrowser(platformId)) {
      this.getSettings()
    }
  }

  /**
   * Get settings from indexeddb then update BehaviorSubjects.
   *
   * Only On Construction.
   */
  private getSettings(): void {
    this.getAll()
      .then((val: Setting[]): void => {
        val.forEach((item: Setting): void => {
          this.addSetting(item)
          this.game[item.key].next(item.value)
        })
      })
      .catch((error: DOMException): void => {
        if (error.message === 'Database not set') {
          interval(100)
            .pipe<number>(take<number>(1))
            .subscribe((val: number): void => {
              this.getSettings()
            })
        } else {
          console.error(error.message)
        }
      })
  }

  private addSetting(setting: Setting): void {
    this.settings.push(setting)
  }

  public put(name: string, value: number): Promise<IDBValidKey> {
    return new Promise(
      (
        resolve: (value: IDBValidKey) => void,
        reject: (reason: DOMException) => void
      ): void => {
        let found: number

        found = this.settings.findIndex((setting: Setting): boolean => {
          return setting.key === name
        })

        if (found === -1) {
          reject(new DOMException('Setting not found'))
          return
        }

        if (this.database.database && this.database.ready) {
          let add: ISetting
          let objectStore: IDBObjectStore
          let request: IDBRequest<IDBValidKey>

          this.settings[found].value = value

          add = Setting.toJSON(this.settings[found])

          objectStore = this.database.database
            .transaction(this.storeName, 'readwrite')
            .objectStore(this.storeName)

          request = objectStore.put(add)

          request.onsuccess = function(event: Event): void {
            resolve(this.result)
          }

          request.onerror = function(event: Event): void {
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
   * Get from indexeddb.
   * Resolve with Setting[].
   * Reject with error.
   */
  private getAll(): Promise<Setting[]> {
    return new Promise(
      (
        resolve: (value: Setting[]) => void,
        reject: (reason: DOMException) => void
      ): void => {
        if (this.database.database && this.database.ready) {
          let objectStore: IDBObjectStore
          let request: IDBRequest<ISetting[]>

          objectStore = this.database.database
            .transaction('settings', 'readonly')
            .objectStore('settings')

          request = objectStore.getAll()

          request.onerror = function(event: Event): void {
            reject(this.error)
          }

          request.onsuccess = function(event: Event): void {
            let result: Setting[]

            result = this.result.map<Setting>(
              (val: ISetting): Setting => {
                return new Setting(val)
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
}
