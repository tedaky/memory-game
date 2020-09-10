import { Component, OnDestroy } from '@angular/core'
import { interval, Subscription } from 'rxjs'

import { createTime } from '../create-time/create-time'
import { Statistic } from '../statistic/statistic'

/**
 * Display a simple stopwatch with
 * `hours`, `minutes`, `seconds`, `milliseconds`
 * with start, stop, continue, and reset functionality.
 */
@Component({
  selector: 'app-stopwatch',
  templateUrl: './stopwatch.component.html'
})
/**
 * Display a simple stopwatch with
 * `hours`, `minutes`, `seconds`, `milliseconds`
 * with start, stop, continue, and reset functionality.
 */
export class StopwatchComponent implements OnDestroy {
  /**
   * Tells if the stopwatch is paused/stopped or running
   *
   * * `true` = running
   * * `false` = paused/stopped
   */
  private active: boolean
  /**
   * The time the stopwatch started.
   */
  private timeBegan: Date
  /**
   * The subscription to the timer
   */
  private timer: Subscription

  /**
   * Hours time. Displayed to 2+ integer places. Shouldn't occur.
   *
   * ex. 00, 01, 12, 100
   */
  public hours: number
  /**
   * Minutes time. Displayed to 2 integer places. Always <60. Rarely occurs.
   *
   * ex. 00, 05, 12
   */
  public minutes: number
  /**
   * Seconds time. Displayed to 2 integer places. Always <60.
   *
   * ex. 00, 05, 12
   */
  public seconds: number
  /**
   * Milliseconds time. Displayed to 3 integer places.
   *
   * ex. 000, 024, 050, 120
   */
  public milliseconds: number

  /**
   * Set stopwatch back to 0 time.
   */
  public clear(): void {
    this.milliseconds = 0
    this.seconds = 0
    this.minutes = 0
    this.hours = 0
  }

  /**
   * Update the stopwatch values.
   *
   * `hours`, `minutes`, `seconds`, `milliseconds`.
   */
  private clockRunning(): void {
    let currentTime: Date
    let timeElapsed: Date

    if (!this.timeBegan) {
      this.timeBegan = new Date()
    }

    currentTime = new Date()
    timeElapsed = new Date(currentTime.getTime() - this.timeBegan.getTime())

    this.hours = timeElapsed.getUTCHours()
    this.minutes = timeElapsed.getUTCMinutes()
    this.seconds = timeElapsed.getUTCSeconds()
    this.milliseconds = timeElapsed.getUTCMilliseconds()

    if (
      this.hours === 23 &&
      this.minutes === 59 &&
      this.seconds === 58 &&
      this.milliseconds >= 900
    ) {
      this.stop()
    }
  }

  /**
   * Continue the stopwatch.
   */
  public continue(): void {
    if (this.active) {
      return
    }

    let currentTime: Date
    let pausedTime: number

    this.unsubscribe()
    this.active = true

    currentTime = new Date()
    pausedTime = createTime({
      hours: this.hours,
      minutes: this.minutes,
      seconds: this.seconds,
      milliseconds: this.milliseconds
    } as Statistic)

    this.timeBegan = new Date(currentTime.getTime() - pausedTime)

    this.timer = interval(10).subscribe((val: number): void => {
      this.clockRunning()
    })
  }

  public ngOnDestroy(): void {
    this.unsubscribe()
  }

  /**
   * Stop the stopwatch and set back to 0 time.
   */
  public reset(): void {
    this.stop()
    this.clear()
  }

  /**
   * Reset the stopwatch and start.
   */
  public restart(): void {
    this.reset()
    this.continue()
  }

  /**
   * Stop the stopwatch.
   */
  public stop(): void {
    if (!this.active) {
      return
    }

    this.active = false

    this.clockRunning()

    this.unsubscribe()
  }

  /**
   * Unsubscribe from the stopwatch timer.
   */
  public unsubscribe(): void {
    if (this.timer && this.timer instanceof Subscription) {
      this.timer.unsubscribe()
    }
  }
}
