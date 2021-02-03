// eslint-disable-next-line no-unused-vars
import { ITime } from '../interfaces/statistics'

/**
 * Augment the score of memory time
 */
const memoryAugment = 4

/**
 * Combine time of `hours`, `minutes`, `seconds`, `milliseconds` for comparison.
 *
 * @param {ITime} time
 *
 * @return {number}
 */
export function createTime(time: ITime): number {
  const result: number =
    (time.milliseconds || 0) +
    (time.seconds || 0) * 1000 +
    (time.minutes || 0) * 60 * 1000 +
    (time.hours || 0) * 60 * 60 * 1000

  return result
}

/**
 * Compute the time of memory and completion.
 *
 * @param {ITime} complete Time it took to complete the game
 * @param {ITime} memory  Time it took for memory
 *
 * @return {number}
 */
export function computeTime(complete: ITime, memory: ITime): number {
  return createTime(complete) + createTime(memory) * memoryAugment
}
