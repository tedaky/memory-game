/// <reference lib="webworker" />

import { Cards } from '../cards'
import { Card } from '../../card/card'
import { ICard } from '../../card/card.d'
import { Count, Match } from '../../statistic/statistic.d'
import { isNullOrUndefined } from '../../utilities/is-null-or-undefined'

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

post()

/**
 * Post the deck to the main thread.
 *
 * `Count` With Unique Cards Count default of 2
 * `Match` With Amount of Cards to Match default of 2
 */
function post(): void
/**
 * Post the deck to the main thread.
 *
 * @param count `Count` Unique Cards Count
 * @param match `Match` Amount of Cards to Match
 */
function post(count: Count, match: Match): void
function post(count?: Count, match?: Match): void {
  let blank: string
  let cards: Cards
  let deck: ICard[]
  let white: string

  if (isNullOrUndefined(count)) {
    count = 2
  }

  if (isNullOrUndefined(match)) {
    match = 2
  }

  cards = new Cards(count, match)
  blank = cards.blank
  white = cards.white
  deck = Card.toJSON(cards.deck)

  postMessage({
    blank,
    deck,
    white
  })
}
