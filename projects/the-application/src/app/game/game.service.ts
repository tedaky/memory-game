import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs'
import { shareReplay } from 'rxjs/operators'

import { Count, Match, Mode } from '../statistic/statistic.d'

@Injectable({
  providedIn: 'root'
})
export class GameService {
  /**
   * Unique cards of the game
   *
   * * 2
   * * 4
   * * 6
   */
  public count: BehaviorSubject<Count>

  /**
   * Flip first then start
   *
   * * 'memorize'
   *
   * Regular type of matching
   *
   * * 'regular'
   */
  public mode: BehaviorSubject<Mode>

  /**
   * Cards to match during flips
   *
   * * 2
   * * 3
   * * 4
   */
  public match: BehaviorSubject<Match>

  /**
   * Is game playing or not
   */
  public playing: BehaviorSubject<boolean>

  /**
   * Master Volume level
   */
  public masterVolume: BehaviorSubject<number>

  /**
   * Effects Volume level
   */
  public effectsVolume: BehaviorSubject<number>

  /**
   * Ambient Volume level
   */
  public ambientVolume: BehaviorSubject<number>

  constructor(private httpClient: HttpClient) {
    this.count = new BehaviorSubject<Count>(2)
    this.match = new BehaviorSubject<Match>(2)
    this.mode = new BehaviorSubject<Mode>('regular')
    this.playing = new BehaviorSubject<boolean>(false)
    this.masterVolume = new BehaviorSubject<number>(0)
    this.effectsVolume = new BehaviorSubject<number>(0)
    this.ambientVolume = new BehaviorSubject<number>(0)
  }

  /**
   * Click sound buffer
   */
  public clickSoundBuffer(): Promise<ArrayBuffer> {
    return new Promise(
      (
        resolve: (value?: ArrayBuffer) => void,
        reject: (reason?: any) => void
      ): void => {
        this.httpClient
          .get('assets/audio/click.mp3', {
            responseType: 'arraybuffer'
          })
          .pipe<ArrayBuffer>(shareReplay<ArrayBuffer>(1))
          .subscribe(
            (res: ArrayBuffer): void => {
              resolve(res)
            },
            (error): void => {
              reject(error)
            }
          )
      }
    )
  }
}
