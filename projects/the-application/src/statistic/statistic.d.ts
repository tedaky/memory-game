/**
 * Statistic interface implementation
 */
export interface IStatistic {
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
  /**
   * Flips
   */
  flips: number
  /**
   * KeyID
   */
  keyID?: number
}
