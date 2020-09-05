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
  //#region Private Holders
  //#region _cards
  /**
   * Holder for `cards`.
   */
  private _cards: Card[]
  //#endregion _cards

  //#region _deck
  /**
   * Holder for `deck`.
   */
  private _deck: Card[]
  //#endregion _deck
  //#endregion Private Holders

  //#region get
  //#region cards
  /**
   * List of unique cards.
   */
  private get cards(): Card[] {
    if (typeof this._cards === 'undefined') {
      this._cards = []
    }

    return this._cards
  }
  //#endregion cards

  //#region deck
  /**
   * Deck of cards.
   */
  public get deck(): Card[] {
    if (typeof this._deck === 'undefined') {
      this._deck = []
    }

    return this._deck
  }
  //#endregion deck

  //#region matchCount
  /**
   * Total number of matches.
   */
  public get matchCount(): number {
    return this.cards.length
  }
  //#endregion matchCount
  //#endregion get

  //#region blank, white images
  //#region blank
  /**
   * Blank image card.
   */
  public get blank(): string {
    return 'assets/blank.png'
  }
  //#endregion blank

  //#region white
  /**
   * White image card.
   */
  public get white(): string {
    return 'assets/white.png'
  }
  //#endregion white
  //#endregion blank, white images

  //#region constructor
  constructor() {
    this.createGame()
  }
  //#endregion constructor

  //#region createCard
  //#region overload
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
  //#endregion overload
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
  //#endregion createCard

  //#region createCards
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
  //#endregion createCards

  //#region createDeck
  //#region overload
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
  //#endregion overload
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
  //#endregion createDeck

  //#region createGame
  /**
   * Create the game by initialising cards and deck.
   */
  private createGame(): void {
    this.createCards()
    // Later use a game mode to create a deck.
    this.createDeck()
  }
  //#endregion createGame

  //#region shuffle
  /**
   * Shuffle the cards randomly,
   */
  public shuffle(): void {
    this.deck.sort((): number => {
      return 0.5 - Math.random()
    })
  }
  //#endregion shuffle
}
