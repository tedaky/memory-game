import { Time } from '../time/time'

/**
 * Combine time of `hours`, `minutes`, `seconds`, `milliseconds` for comparison.
 *
 * @param time `Time`
 */
export function createTime(time: Time): number {
  let result: number

  result =
    (time.milliseconds || 0) +
    (time.seconds || 0) * 1000 +
    (time.minutes || 0) * 60 * 1000 +
    (time.hours || 0) * 60 * 60 * 1000

  return result
}
