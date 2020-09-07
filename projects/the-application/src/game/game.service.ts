import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs'

import { Count, Match, Mode } from '../statistic/statistic.d'

@Injectable({
  providedIn: 'root'
})
export class GameService {
  /**
   * Unique cards of the game
   *
   * * 6
   * * 9
   * * 12
   */
  public count: BehaviorSubject<Count>

  /**
   * Flip first then start
   *
   * * 'flip'
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

  constructor() {
    this.count = new BehaviorSubject<Count>(6)
    this.match = new BehaviorSubject<Match>(2)
    this.mode = new BehaviorSubject<Mode>('regular')
    this.playing = new BehaviorSubject<boolean>(false)
  }
}
