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
   * Count
   */
  count: Count
  /**
   * Match
   */
  match: Match
  /**
   * Mode
   */
  mode: Mode
  /**
   * KeyID
   */
  keyID?: number
}

/**
 * * 6 = 6 unique cards
 * * 9 = 9 unique cards
 * * 12 = 12 unique cards
 */
export type Count = 6 | 9 | 12
/**
 * * 2 = match 2 game
 * * 3 = match 3 game
 * * 4 = match 4 game
 */
export type Match = 2 | 3 | 4

/**
 * * regular = regular classic memory type game
 * * flip = cards start face up then face down
 */
export type Mode = 'flip' | 'regular'
