import { Statistic } from '../statistic/statistic'

/**
 * Combine time of `hours`, `minutes`, `seconds`, `milliseconds` for comparison.
 *
 * @param statistic `Statistic`
 */
export function createTime(statistic: Statistic): number {
  let hours: string
  let int: number
  let milliseconds: string
  let minutes: string
  let seconds: string
  let time: string

  hours = statistic.hours.toString()
  minutes = statistic.minutes.toString()
  seconds = statistic.seconds.toString()
  milliseconds = statistic.milliseconds.toString()

  if (minutes.length === 1) {
    minutes = ['0', minutes].join('')
  }

  if (seconds.length === 1) {
    seconds = ['0', seconds].join('')
  }

  if (milliseconds.length === 2) {
    milliseconds = ['0', milliseconds].join('')
  } else if (milliseconds.length === 1) {
    milliseconds = ['00', milliseconds].join('')
  }

  time = [hours, minutes, seconds, milliseconds].join('').replace(/^0+/, '')

  if (time === '') {
    time = '0'
  }

  int = parseInt(time, 10)

  return int
}
