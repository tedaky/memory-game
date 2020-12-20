/// <reference lib="webworker" />

import { Stopwatch } from './stopwatch'
import { StopwatchState } from '../../time/time.d'

let stopwatch: Stopwatch

stopwatch = new Stopwatch()

addEventListener('message', (event: MessageEvent<StopwatchState>): void => {
  switch (event.data) {
    case 'pause':
      stopwatch.stop()
      break
    case 'reset':
      stopwatch.reset()
      break
    case 'restart':
      stopwatch.restart()
      break
    case 'start':
      stopwatch.continue()
      break
  }
})
