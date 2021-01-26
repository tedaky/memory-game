export interface ITime {
  /**
   * Milliseconds
   */
  milliseconds: number
  /**
   * Seconds
   */
  seconds: number
  /**
   * Minutes
   */
  minutes: number
  /**
   * Hours
   */
  hours: number
}

export type StopwatchState = 'pause' | 'reset' | 'restart' | 'start'
