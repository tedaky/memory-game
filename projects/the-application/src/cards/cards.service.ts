import { Injectable } from '@angular/core'

import { Card } from '../card/card'
import { ICard } from '../card/card.d'
import { GameService } from '../game/game.service'
import {
  useValentinesDay,
  useStPatricksDay,
  useEaster,
  use4thOfJuly,
  useHalloween,
  useThanksgiving,
  useChristmas
} from '../holiday/holiday'

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
  //#region _blankSource
  /**
   * Holder for `blankSource`.
   */
  private _blankSource: string
  //#endregion _blankSource

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
    return `assets/${this.blankSource}/blank.png`
  }
  //#endregion blank

  //#region blankSource
  /**
   * BlankSource image folder.
   */
  public get blankSource(): string {
    return this._blankSource || 'regular'
  }
  public set blankSource(val: string) {
    this._blankSource = val
  }
  //#endregion blankSource

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
  constructor(private game: GameService) {
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
    let holidayCards: boolean
    holidayCards = false

    // Valentine's Day
    if (useValentinesDay()) {
      this.createRegularCards()
      holidayCards = true
    }

    // St. Patricks's Day
    if (useStPatricksDay()) {
      this.createRegularCards()
      holidayCards = true
    }

    // Easter
    if (useEaster()) {
      this.createRegularCards()
      holidayCards = true
    }

    // 4th of July
    if (use4thOfJuly()) {
      this.createRegularCards()
      holidayCards = true
    }

    // Halloween
    if (useHalloween()) {
      this.createHalloweenCards()
      holidayCards = true
    }

    // Thanksgiving
    if (useThanksgiving()) {
      this.createRegularCards()
      holidayCards = true
    }

    // Christmas
    if (useChristmas()) {
      this.createRegularCards()
      holidayCards = true
    }

    if (!holidayCards) {
      this.createRegularCards()
    }
  }
  //#endregion createCards

  //#region createRegularCards
  /**
   * Create a unique set of regular cards.
   */
  private createRegularCards(): void {
    let assets: string

    assets = 'assets/regular/'

    this.blankSource = 'regular'

    this.createCard('cheeseburger', `${assets}cheeseburger.png`)
    this.createCard('fries', `${assets}fries.png`)
    this.createCard('hotdog', `${assets}hotdog.png`)
    this.createCard('ice-cream', `${assets}ice-cream.png`)
    this.createCard('milkshake', `${assets}milkshake.png`)
    this.createCard('pizza', `${assets}pizza.png`)
  }
  //#endregion createRegularCards

  //#region createHalloweenCards
  /**
   * Create a unique set of halloween cards.
   */
  private createHalloweenCards(): void {
    let assets: string

    assets = 'assets/halloween/'

    this.blankSource = 'halloween'

    this.createCard('castle', `${assets}castle.png`)
    this.createCard('furry monster', `${assets}furry-monster.png`)
    this.createCard('lantern', `${assets}lantern.png`)
    this.createCard('pumpkin', `${assets}pumpkin.png`)
    this.createCard('slug monster', `${assets}slug-monster.png`)
    this.createCard('witch hat', `${assets}witch-hat.png`)
  }
  //#endregion createRegularCards

  //#region createDeck
  /**
   * Create a deck pairing each card.
   */
  private createDeck(): void {
    let temp: Card[]
    temp = []

    // Clear the current deck of any cards.
    this.deck.splice(0, this.deck.length)

    this.shuffleCards()

    temp = this.cards.slice(0, this.game.count.value)

    // Loop each individual card.
    temp.forEach((card: Card): void => {
      let i: number

      i = 0

      // Create new card(s) based on the setCount.
      for (; i < this.game.match.value; i++) {
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

  //#region shuffleCards
  /**
   * Shuffle the list of unique cards
   */
  private shuffleCards(): void {
    this.cards.sort((): number => {
      return 0.5 - Math.random()
    })
  }
  //#endregion shuffleCards

  //#region getCardBack
  /**
   * The back of the card to use based on the flip state.
   *
   * @param card `Card` given card
   */
  public getCardBack(card: Card): string {
    if (card.flipped === 3 || card.flipped === 1 || card.flipped === 0) {
      return this.blank
    } else if (card.flipped === 4) {
      return card.image
    } else if (card.flipped === 2) {
      return this.white
    }
  }
  //#endregion getCardBack

  //#region getCardImage
  /**
   * Return what image to use based on card flip state.
   *
   * @param card `Card` given card
   */
  public getCardImage(card: Card): string {
    if (card.flipped === 4 || card.flipped === 3 || card.flipped === 1) {
      return card.image
    } else if (card.flipped === 2) {
      return this.white
    } else if (card.flipped === 0) {
      return this.blank
    }
  }
  //#endregion getCardImage

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
