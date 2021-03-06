/// <reference lib="webworker" />

import { Card } from '../../card/card'
import { ICard } from '../../card/card.d'
import {
  useValentinesDay,
  useStPatricksDay,
  useEaster,
  use4thOfJuly,
  useHalloween,
  useThanksgiving,
  useChristmas
} from '../../holiday/holiday'
import { Count, Match } from '../../statistic/statistic.d'
import { isNullOrUndefined } from '../../utilities/is-null-or-undefined'
import { MakeArray } from '../../utilities/make-array'
import { MakeProperty } from '../../utilities/make-property'

export class Cards {
  //#region get
  //#region cards
  /**
   * List of unique cards.
   */
  @MakeArray<Cards, Card>()
  private cards: Card[]
  //#endregion cards

  //#region deck
  /**
   * Deck of cards.
   */
  @MakeArray<Cards, Card>()
  public deck: Card[]
  //#endregion deck
  //#endregion get

  //#region blank, white images

  //#region blankSource
  /**
   * BlankSource image folder.
   */
  @MakeProperty<Cards, string>(null, 'regular')
  private blankSource: string
  //#endregion blankSource

  //#region blank
  /**
   * Blank image card.
   */
  public get blank(): string {
    return `assets/${this.blankSource}/blank.png`
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
  constructor()
  constructor(count: Count, match: Match)
  constructor(count?: Count, match?: Match) {
    if (isNullOrUndefined(count)) {
      count = 2
    }

    if (isNullOrUndefined(match)) {
      match = 2
    }

    this.createDeck(count, match)
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

  //#region createCardsMethods
  //#region createCards
  /**
   * Create a unique set of cards.
   */
  private createCards(): void {
    // Clear unique cards.
    this.cards = []

    let holidayCards: boolean
    holidayCards = false

    // Valentine's Day
    if (useValentinesDay()) {
      this.createValentinesDayCards()
      holidayCards = true
    }

    // St. Patricks's Day
    if (useStPatricksDay()) {
      this.createStPatricksDayCards()
      holidayCards = true
    }

    // Easter
    if (useEaster()) {
      this.createEasterCards()
      holidayCards = true
    }

    // 4th of July
    if (use4thOfJuly()) {
      this.create4thOfJulyCards()
      holidayCards = true
    }

    // Halloween
    if (useHalloween()) {
      this.createHalloweenCards()
      holidayCards = true
    }

    // Thanksgiving
    if (useThanksgiving()) {
      this.createThanksgivingCards()
      holidayCards = true
    }

    // Christmas
    if (useChristmas()) {
      this.createChristmasCards()
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

  //#region createValentinesDayCards
  /**
   * Create a unique set of valentines day cards.
   */
  private createValentinesDayCards(): void {
    let assets: string

    assets = 'assets/valentines-day/'

    this.blankSource = 'valentines-day'

    this.createCard('be my valentine', `${assets}be-my-valentine.png`)
    this.createCard('bear boy', `${assets}bear-boy.png`)
    this.createCard('bear girl', `${assets}bear-girl.png`)
    this.createCard('butterfly', `${assets}butterfly.png`)
    this.createCard('heart', `${assets}heart.png`)
    this.createCard('heart box', `${assets}heart-box.png`)
  }
  //#endregion createValentinesDayCards

  //#region createStPatricksDayCards
  /**
   * Create a unique set of st patricks day cards.
   */
  private createStPatricksDayCards(): void {
    let assets: string

    assets = 'assets/st-patricks-day/'

    this.blankSource = 'st-patricks-day'

    this.createCard('green hat', `${assets}green-hat.png`)
    this.createCard(
      'happy saint patricks day',
      `${assets}happy-saint-patricks-day.png`
    )
    this.createCard('lucky', `${assets}lucky.png`)
    this.createCard('lucky horse shoe', `${assets}lucky-horse-shoe.png`)
    this.createCard('pot of gold', `${assets}pot-of-gold.png`)
    this.createCard('shamrock', `${assets}shamrock.png`)
  }
  //#endregion createStPatricksDayCards

  //#region createEasterCards
  /**
   * Create a unique set of easter cards.
   */
  private createEasterCards(): void {
    let assets: string

    assets = 'assets/easter/'

    this.blankSource = 'easter'

    this.createCard('basket of eggs', `${assets}basket-of-eggs.png`)
    this.createCard('bear basket', `${assets}bear-basket.png`)
    this.createCard('bunny carrot', `${assets}bunny-carrot.png`)
    this.createCard('egg outline', `${assets}egg-outline.png`)
    this.createCard('egg paisley', `${assets}egg-paisley.png`)
    this.createCard('rabbit basket', `${assets}rabbit-basket.png`)
  }
  //#endregion createEasterCards

  //#region create4thOfJulyCards
  /**
   * Create a unique set of 4th of july cards.
   */
  private create4thOfJulyCards(): void {
    let assets: string

    assets = 'assets/4th-of-july/'

    this.blankSource = '4th-of-july'

    this.createCard('flag hat', `${assets}flag-hat.png`)
    this.createCard('flag horn', `${assets}flag-horn.png`)
    this.createCard('flag pencil', `${assets}flag-pencil.png`)
    this.createCard('flag scallop', `${assets}flag-scallop.png`)
    this.createCard('flag star', `${assets}flag-star.png`)
    this.createCard('sam smile', `${assets}sam-smile.png`)
  }
  //#endregion create4thOfJulyCards

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
  //#endregion createHalloweenCards

  //#region createThanksgivingCards
  /**
   * Create a unique set of thanksgiving cards.
   */
  private createThanksgivingCards(): void {
    let assets: string

    assets = 'assets/thanksgiving/'

    this.blankSource = 'thanksgiving'

    this.createCard('autumn tree', `${assets}autumn-tree.png`)
    this.createCard('candy corn', `${assets}candy-corn.png`)
    this.createCard('cornucopia', `${assets}cornucopia.png`)
    this.createCard('leaf', `${assets}leaf.png`)
    this.createCard('scarecrow', `${assets}scarecrow.png`)
    this.createCard('turkey', `${assets}turkey.png`)
  }
  //#endregion createThanksgivingCards

  //#region createChristmasCards
  /**
   * Create a unique set of christmas cards.
   */
  private createChristmasCards(): void {
    let assets: string

    assets = 'assets/christmas/'

    this.blankSource = 'christmas'

    this.createCard('bell', `${assets}bell.png`)
    this.createCard('candy cane', `${assets}candy-cane.png`)
    this.createCard('ornament', `${assets}ornament.png`)
    this.createCard('sled', `${assets}sled.png`)
    this.createCard('snowflake', `${assets}snowflake.png`)
    this.createCard('wreath', `${assets}wreath.png`)
  }
  //#endregion createChristmasCards
  //#endregion createCardsMethods

  //#region createDeck
  /**
   * Create a deck pairing each card.
   */
  private createDeck(count: Count, match: Match): void {
    // Clear the current deck of any cards.
    this.deck = []

    // Replenish unique cards.
    // Allows for holiday cards without closing and reopening.
    this.createCards()

    // Randomise the cards.
    this.shuffleCards(this.cards)

    // Take the number of cards based on the game count setting.
    this.cards = this.cards.slice(0, count)

    // Loop each individual card.
    this.cards.forEach((card: Card): void => {
      let i: number

      i = 0

      // Create new card(s) based on the setCount.
      for (; i < match; i++) {
        // Push each new card to the deck.
        this.deck.push(new Card(card))
      }
    })

    // Randomise the deck.
    this.shuffleCards(this.deck)
  }
  //#endregion createDeck

  //#region shuffleCards
  /**
   * Shuffle the list of unique cards
   */
  private shuffleCards(array: Card[]): void {
    array.sort((): number => {
      return 0.5 - Math.random()
    })
  }
  //#endregion shuffleCards
}
