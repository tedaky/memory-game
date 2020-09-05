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
   * Holder for `cards`.
   */
  private _cards: Card[]
  /**
   * Holder for `deck`.
   */
  private _deck: Card[]

  /**
   * List of unique cards.
   */
  private get cards(): Card[] {
    if (typeof this._cards === 'undefined') {
      this._cards = []
    }

    return this._cards
  }

  /**
   * Blank image card.
   */
  public get blank(): string {
    return 'assets/blank.png'
  }

  /**
   * Deck of cards.
   */
  public get deck(): Card[] {
    if (typeof this._deck === 'undefined') {
      this._deck = []
    }

    return this._deck
  }

  /**
   * Total number of matches.
   */
  public get matchCount(): number {
    return this.cards.length
  }

  /**
   * White image card.
   */
  public get white(): string {
    return 'assets/white.png'
  }

  constructor() {
    this.createGame()
  }

  /**
   * Add a unique card.
   *
   * @param card `Card`.
   */
  private createCard(card: Card): void
  /**
   * Add a unique card.
   *
   * @param cardLike `ICard`.
   */
  private createCard(cardLike: ICard): void
  /**
   * Add a unique card.
   *
   * @param name `string` title.
   * @param image `string` path.
   */
  private createCard(name: string, image: string): void
  private createCard(arg1: string | Card | ICard, arg2?: string): void {
    let card: Card
    let found: number

    if (typeof arg1 === 'string') {
      card = new Card(arg1, arg2)
    } else {
      card = new Card(arg1)
    }

    found = this.cards.findIndex((index: Card): boolean => {
      return index.name === card.name || index.image === card.image
    })

    if (found === -1) {
      this.cards.push(card)
    } else {
      console.warn('Card is similar to an existing card.')
      console.warn('Given card: ', card)
      console.warn('Existing card: ', this.cards[found])
    }
  }

  /**
   * Create a unique set of cards.
   */
  private createCards(): void {
    this.createCard('cheeseburger', 'assets/cheeseburger.png')
    this.createCard('fries', 'assets/fries.png')
    this.createCard('hotdog', 'assets/hotdog.png')
    this.createCard('ice-cream', 'assets/ice-cream.png')
    this.createCard('milkshake', 'assets/milkshake.png')
    this.createCard('pizza', 'assets/pizza.png')
  }

  /**
   * Create a deck pairing each card.
   */
  private createDeck(): void
  /**
   * Create a deck by making new cards for matching based on a setCount.
   *
   * @param setCount How many times to copy a card.
   */
  private createDeck(setCount: number): void
  private createDeck(setCount?: number): void {
    if (typeof setCount === 'undefined') {
      // Create a default of 2 for default game type of pair matching.
      setCount = 2
    }

    // Clear the current deck of any cards.
    this.deck.splice(0, this.deck.length)

    // Loop each individual card.
    this.cards.forEach((card: Card): void => {
      let i: number

      i = 0

      // Create new card(s) based on the setCount.
      for (; i < setCount; i++) {
        // Push each new card to the deck.
        this.deck.push(new Card(card))
      }
    })
  }

  /**
   * Create the game by initialising cards and deck.
   */
  private createGame(): void {
    this.createCards()
    // Later use a game mode to create a deck.
    this.createDeck(2)
  }

  /**
   * Shuffle the cards randomly,
   */
  public shuffle(): void {
    this.deck.sort((): number => {
      return 0.5 - Math.random()
    })
  }
}
