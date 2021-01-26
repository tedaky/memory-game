/// <reference lib="webworker" />

import { post } from './post'
import { Count, Match } from '../../statistic/statistic.d'

addEventListener(
  'message',
  (
    event: MessageEvent<{
      count: Count
      match: Match
    }>
  ): void => {
    post(event.data.count, event.data.match)
  }
)
