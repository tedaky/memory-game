/// <reference lib="webworker" />

import { Cards } from '../cards'
import { Card } from '../../card/card'
import { ICard } from '../../card/card.d'
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

post()

function post(count: Count = 2, match: Match = 2): void {
  let blank: string
  let cards: Cards
  let deck: ICard[]

  cards = new Cards(count, match)
  blank = cards.blank
  deck = Card.toJSON(cards.deck)

  postMessage({
    blank,
    deck
  })
}
