import { Component, OnDestroy } from '@angular/core'
import { interval, Subscription } from 'rxjs'

/**
 * Display a simple stopwatch with
 * `hours`, `minutes`, `seconds`, `milliseconds`
 * with start, stop, and reset functionality.
 */
@Component({
  selector: 'app-stopwatch',
  templateUrl: './stopwatch.component.html'
})
/**
 * Display a simple stopwatch with
 * `hours`, `minutes`, `seconds`, `milliseconds`
 * with start, stop, and reset functionality.
 */
export class StopwatchComponent implements OnDestroy {
  /**
   * The time the stopwatch started.
   */
  private timeBegan: Date
  /**
   * The subscription to the timer
   */
  private started: Subscription

  /**
   * Milliseconds time. Displayed to 3 integer places.
   *
   * ex. 000, 024, 050, 120
   */
  public milliseconds: number
  /**
   * Seconds time. Displayed to 2 integer places. Always <60.
   *
   * ex. 00, 05, 12
   */
  public seconds: number
  /**
   * Minutes time. Displayed to 2 integer places. Always <60. Rarely occurs.
   *
   * ex. 00, 05, 12
   */
  public minutes: number
  /**
   * Hours time. Displayed to 2+ integer places. Shouldn't occur.
   *
   * ex. 00, 01, 12, 100
   */
  public hours: number

  /**
   * Update the stopwatch values.
   *
   * `hours`, `minutes`, `seconds`, `milliseconds`.
   */
  private clockRunning(): void {
    let currentTime: Date
    let timeElapsed: Date

    currentTime = new Date()
    timeElapsed = new Date(currentTime.getTime() - this.timeBegan.getTime())

    this.hours = timeElapsed.getUTCHours()
    this.minutes = timeElapsed.getUTCMinutes()
    this.seconds = timeElapsed.getUTCSeconds()
    this.milliseconds = timeElapsed.getUTCMilliseconds()
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

    this.timeBegan = new Date()

    this.started = interval(10).subscribe((val: number): void => {
      this.clockRunning()
    })
  }

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
   * Stop the stopwatch.
   */
  public stop(): void {
    if (this.started && this.started instanceof Subscription) {
      this.started.unsubscribe()
    }
  }

  public ngOnDestroy(): void {
    this.stop()
  }
}
