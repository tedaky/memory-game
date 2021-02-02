import { ITime } from '../interfaces/statistics'

/**
 * Augment the score of memory time
 */
const memoryAugment = 4

/**
 * Combine time of `hours`, `minutes`, `seconds`, `milliseconds` for comparison.
 *
 * @param time `Time`
 */
export function createTime(time: ITime): number {
  let result: number

  result =
    (time.milliseconds || 0) +
    (time.seconds || 0) * 1000 +
    (time.minutes || 0) * 60 * 1000 +
    (time.hours || 0) * 60 * 60 * 1000

  return result
}

/**
 * Compute the time of memory and completion.
 *
 * @param complete `ITime` Time it took to complete the game
 * @param memory `ITime` Time it took for memory
 */
export function computeTime(complete: ITime, memory: ITime) {
  return createTime(complete) + createTime(memory) * memoryAugment
}
