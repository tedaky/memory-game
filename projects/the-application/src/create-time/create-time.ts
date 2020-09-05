import { Statistic } from '../statistic/statistic'

/**
 * Combine time of `hours`, `minutes`, `seconds`, `milliseconds` for comparison.
 *
 * @param statistic `Statistic`
 */
export function createTime(statistic: Statistic): number {
  let result: number

  result =
    statistic.milliseconds +
    statistic.seconds * 1000 +
    statistic.minutes * 60 * 1000 +
    statistic.hours * 60 * 60 * 1000

  return result
}
