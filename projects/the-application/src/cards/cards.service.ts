import { Injectable } from '@angular/core'

import { Card } from '../card/card'
import { ICard } from '../card/card.d'

/**
 * Create and make cards available.
 */
@Injectable({
  providedIn: 'root'
})
/**
 * Create and make cards available.
 */
export class CardsService {
  /**
   * Holder for `cardArray`
   */
  private _cardArray: Card[]

  /**
   * List of cards
   */
  public get cardArray(): Card[] {
    if (typeof this._cardArray === 'undefined') {
      this._cardArray = []
    }

    return this._cardArray
  }

  constructor() {
    this.createCards()
  }

  /**
   * Create a deck of cards.
   */
  private createCards(): void {
    if (!this.cardArray.length) {
      this.addCardPair('cheeseburger', 'assets/cheeseburger.png')
      this.addCardPair('fries', 'assets/fries.png')
      this.addCardPair('hotdog', 'assets/hotdog.png')
      this.addCardPair('ice-cream', 'assets/ice-cream.png')
      this.addCardPair('milkshake', 'assets/milkshake.png')
      this.addCardPair('pizza', 'assets/pizza.png')
    }
  }

  /**
   * Add two cards of the same entry for matching.
   *
   * @param card `Card`
   */
  private addCardPair(card: Card): void
  /**
   * Add two cards of the same entry for matching.
   *
   * @param cardLike `ICard`
   */
  private addCardPair(cardLike: ICard): void
  /**
   * Add two cards of the same entry for matching.
   *
   * @param name `string` title
   * @param image `string` path
   */
  private addCardPair(name: string, image: string): void
  private addCardPair(arg1: string | Card | ICard, arg2?: string): void {
    let card: Card

    if (typeof arg1 === 'string') {
      card = new Card(arg1, arg2)
    } else if (arg1 instanceof Card) {
      card = arg1
    } else {
      card = new Card(arg1)
    }

    this.cardArray.push(card, card)
  }

  /**
   * Shuffle the cards randomly.
   */
  public shuffle(): void {
    this.cardArray.sort((): number => {
      return 0.5 - Math.random()
    })
  }
}
