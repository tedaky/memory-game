import { isPlatformBrowser } from '@angular/common'
import { Inject, Injectable, PLATFORM_ID } from '@angular/core'
import { BehaviorSubject } from 'rxjs'

import { ICard } from '../card/card.d'
import { GameService } from '../game/game.service'
import { isNullOrUndefined } from '../utilities/is-null-or-undefined'
import { MakeArray } from '../utilities/make-array'
import { MakeProperty } from '../utilities/make-property'

/**
 * Create and make cards available.
 */
@Injectable()
export class CardsService {
  /**
   * The worker for generating a random deck of cards
   */
  private worker: Worker

  //#region deck
  /**
   * Deck of cards.
   */
  @MakeArray<CardsService, ICard>()
  public deck: ICard[]
  //#endregion deck

  //#region blank
  /**
   * Blank image card.
   */
  @MakeProperty<CardsService, string>(null, 'assets/regular/blank.png')
  public blank: string
  //#endregion blank

  //#region white
  /**
   * White image card.
   */
  @MakeProperty<CardsService, string>(null, 'assets/white.png')
  public white: string
  //#endregion white

  /**
   * Refresh the cards.
   */
  public refresh: BehaviorSubject<'refresh'>

  //#region constructor
  constructor(
    @Inject(PLATFORM_ID) private readonly platformId: string,
    private game: GameService
  ) {
    this.refresh = new BehaviorSubject<'refresh'>('refresh')
    this.registerWorker()
  }
  //#endregion constructor

  /**
   * register the worker
   */
  private registerWorker(): void {
    if (isPlatformBrowser(this.platformId)) {
      if (!isNullOrUndefined(Worker)) {
        this.worker = new Worker('./worker/cards.worker', {
          type: 'module',
          name: 'cards'
        })

        this.worker.addEventListener(
          'message',
          (
            event: MessageEvent<{
              blank: string
              deck: ICard[]
              white: string
            }>
          ): void => {
            this.blank = event.data.blank
            this.deck = event.data.deck
            // -- Use or not to use???
            // .map<Card>(
            //   (card: ICard): Card => {
            //     return new Card(card)
            //   }
            // )
            this.white = event.data.white
            this.refresh.next('refresh')
          }
        )
      }
    }
  }

  //#region shuffle
  /**
   * Make a new deck.
   */
  public shuffle(): void {
    if (isPlatformBrowser(this.platformId)) {
      if (!isNullOrUndefined(Worker) && !isNullOrUndefined(this.worker)) {
        this.worker.postMessage({
          count: this.game.count.value,
          match: this.game.match.value
        })
      }
    }
  }
  //#endregion shuffle

  //#region getCardBack
  /**
   * The back of the card to use based on the flip state.
   *
   * @param card `ICard` given card
   */
  public getCardBack(card: ICard): string {
    if (card.flipped === 3 || card.flipped === 1 || card.flipped === 0) {
      return this.blank
    }
    if (card.flipped === 4) {
      return card.image
    }
    if (card.flipped === 2) {
      return this.white
    }
    return this.blank
  }
  //#endregion getCardBack

  //#region getCardImage
  /**
   * Return what image to use based on card flip state.
   *
   * @param card `ICard` given card
   */
  public getCardImage(card: ICard): string {
    if (card.flipped === 4 || card.flipped === 3 || card.flipped === 1) {
      return card.image
    }
    if (card.flipped === 2) {
      return this.white
    }
    if (card.flipped === 0) {
      return this.blank
    }
    return this.blank
  }
  //#endregion getCardImage
}
