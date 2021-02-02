/**
 * Time seperated
 */
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

/**
 * Statistic interface implementation
 */
export interface IStatistic {
  /**
   * Mode
   */
  mode: Mode
  /**
   * Match
   */
  match: Match
  /**
   * Flips
   */
  flips: number
  /**
   * Count
   */
  count: Count
  /**
   * Complete Time
   */
  complete: ITime
  /**
   * Memory Time
   */
  memory: ITime
  /**
   * Computed time of Complete
   */
  computed?: number
  /**
   * Server Created Time Stamp
   */
  creationTime?: Date | number | string
  /**
   * User that owns this statistic
   */
  uid?: string
  /**
   * Statistic ID
   */
  sid?: string
}

/**
 * * 2 = 2 unique cards
 * * 4 = 4 unique cards
 * * 6 = 6 unique cards
 */
export type Count = 2 | 4 | 6
/**
 * * 2 = match 2 game
 * * 3 = match 3 game
 * * 4 = match 4 game
 */
export type Match = 2 | 3 | 4

/**
 * * regular = regular classic memory type game
 * * memorize = cards start face up then face down
 */
export type Mode = 'memorize' | 'regular'
