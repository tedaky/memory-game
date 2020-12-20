/// <reference lib="webworker" />

import { post } from './post'
import { createTime } from '../../create-time/create-time'
import { Time } from '../../time/time'

export class Stopwatch {
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
   * Hours time. Displayed to 2+ integer places. Shouldn't occur.
   *
   * ex. 00, 01, 12, 100
   */
  private hours: number
  /**
   * Minutes time. Displayed to 2 integer places. Always <60. Rarely occurs.
   *
   * ex. 00, 05, 12
   */
  private minutes: number
  /**
   * Seconds time. Displayed to 2 integer places. Always <60.
   *
   * ex. 00, 05, 12
   */
  private seconds: number
  /**
   * Milliseconds time. Displayed to 3 integer places.
   *
   * ex. 000, 024, 050, 120
   */
  private milliseconds: number

  /**
   * Set stopwatch back to 0 time.
   */
  private clear(): void {
    let time: Time

    this.milliseconds = 0
    this.seconds = 0
    this.minutes = 0
    this.hours = 0

    time = new Time(this.milliseconds, this.seconds, this.minutes, this.hours)

    post(time)
  }

  /**
   * Update the stopwatch values.
   *
   * `hours`, `minutes`, `seconds`, `milliseconds`.
   */
  private clockRunning(): void {
    let currentTime: Date
    let timeElapsed: Date
    let time: Time

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

    time = new Time(this.milliseconds, this.seconds, this.minutes, this.hours)

    post(time)

    if (this.active) {
      setTimeout((): void => {
        if (this.active) {
          this.clockRunning()
        }
      }, 1)
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
    let time: Time

    this.active = true

    currentTime = new Date()

    time = new Time(this.milliseconds, this.seconds, this.minutes, this.hours)

    pausedTime = createTime(time)

    this.timeBegan = new Date(currentTime.getTime() - pausedTime)

    this.clockRunning()
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
  }
}
