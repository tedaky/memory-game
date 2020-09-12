import { ITime } from '../time/time.d'

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
