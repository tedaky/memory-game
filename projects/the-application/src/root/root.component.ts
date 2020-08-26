import {
  Component,
  Inject,
  OnInit,
  PLATFORM_ID,
  ViewChild
} from '@angular/core'

import { BackgroundService } from '../background/background.service'
import { Card } from '../card/card'
import { CardsService } from '../cards/cards.service'
import { environment } from '../environments/environment'
import { Statistic } from '../statistic/statistic'
import { StatisticsService } from '../statistics/statistics.service'
import { StopwatchComponent } from '../stopwatch/stopwatch.component'

/**
 * Root that holds game and statistics.
 */
@Component({
  selector: 'app-root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.scss']
})
/**
 * Root that holds game and statistics.
 */
export class RootComponent implements OnInit {
  /**
   * Id of cards flipped.
   */
  private cardsChosenId: number[]
  /**
   * Tell game that checking is in progress.
   */
  private checking: boolean
  /**
   * Tell if the game is in play.
   */
  private playing: boolean
  /**
   * Keep track of cards that haven't been flipped.
   */
  private unFlipped: number[]

  /**
   * Chosen card matches.
   */
  public cardsWon: string[][]
  /**
   * Number of flips.
   */
  public flips: number

  /**
   * Stopwatch component.
   */
  @ViewChild(StopwatchComponent, { static: true })
  public stopwatch: StopwatchComponent

  constructor(
    @Inject(PLATFORM_ID) private readonly platformId: string,
    private statistics: StatisticsService,
    public cards: CardsService,
    background: BackgroundService
  ) {}

  /**
   * Check for a match
   */
  private checkForMatch(): void
  /**
   * Check for a match
   *
   * @param self `this`
   */
  private checkForMatch(self: this): void
  private checkForMatch(self?: this): void {
    if (typeof self === 'undefined') {
      self = this
    }
    let option0: number
    let option1: number
    let cardChosen0: Card
    let cardChosen1: Card

    option0 = self.cardsChosenId[0]
    option1 = self.cardsChosenId[1]

    cardChosen0 = self.cards.cardArray[option0]
    cardChosen1 = self.cards.cardArray[option1]

    if (cardChosen0.name === cardChosen1.name) {
      cardChosen0.flipped = 2
      cardChosen1.flipped = 2

      self.cardsWon.push([cardChosen0.name, cardChosen1.name])
    } else {
      cardChosen0.flipped = 0
      cardChosen1.flipped = 0
    }

    if (self.cardsWon.length === 6) {
      let statistic: Statistic

      self.playing = false
      self.stopwatch.stop()

      statistic = new Statistic(
        self.stopwatch.milliseconds,
        self.stopwatch.seconds,
        self.stopwatch.minutes,
        self.stopwatch.hours,
        self.flips
      )

      self.statistics.addStatistic(statistic)
    }

    self.cardsChosenId = []
  }

  /**
   * Flip card and check properties.
   *
   * @param event event that flipped the card
   * @param index card number
   */
  public flipCard(event: Event, index: number): void {
    event.preventDefault()

    if (!this.playing) {
      this.playing = true
      this.stopwatch.restart()
    }

    if (!this.cards.cardArray[index].flipped && !this.checking) {
      let option0: number
      let option1: number

      this.flips++
      this.cardsChosenId.push(index)

      option0 = this.cardsChosenId[0]
      option1 = this.cardsChosenId[1]

      if (
        this.cardsChosenId.length === 2 &&
        this.cards.cardArray[option0].name ===
          this.cards.cardArray[option1].name &&
        this.unFlipped.includes(option1)
      ) {
        let swap0: Card
        let swap1: Card
        let found: number

        swap0 = this.cards.cardArray[option1]

        found = this.unFlipped.findIndex((item: number): boolean => {
          return this.cards.cardArray[item].name !== swap0.name
        })

        if (found !== -1) {
          swap1 = this.cards.cardArray[this.unFlipped[found]]
          this.cards.cardArray[this.unFlipped[found]] = swap0
          this.cards.cardArray[option1] = swap1
        }
      }

      this.cards.cardArray[index].flipped = 1

      this.updateFlipped(index)

      if (this.cardsChosenId.length === 2) {
        let self: this

        this.checking = true

        self = this

        window.setTimeout((): void => {
          self.checkForMatch(self)
          self.checking = false
        }, 500)
      }
    }
  }

  private updateFlipped(index: number): void {
    if (this.unFlipped.includes(index)) {
      let unflipped: number

      unflipped = this.unFlipped.indexOf(index)
      this.unFlipped.splice(unflipped, 1)

      this.unFlipped.sort((): number => {
        return 0.5 - Math.random()
      })
    }
  }

  /**
   * Reset the game play.
   *
   * @param event event that initiated the reset.
   */
  public reset(event: Event): void {
    event.preventDefault()

    this.cards.cardArray.forEach((card: Card): void => {
      card.flipped = 0
    })

    this.unFlipped = [...Array(this.cards.cardArray.length).keys()]
    this.unFlipped.sort((): number => {
      return 0.5 - Math.random()
    })
    this.cardsChosenId = []
    this.cardsWon = []
    this.flips = 0

    this.cards.shuffle()
    this.stopwatch.stop()
    this.stopwatch.clear()
    this.playing = false
  }

  public ngOnInit(): void {
    this.reset(new Event('click'))
    this.webWorker()
  }

  private webWorker(): void {
    if (typeof Worker !== 'undefined') {
      let worker: Worker

      worker = new Worker('./root.worker', { type: 'module' })

      worker.onmessage = function(event: MessageEvent): void {
        console.log(`page got message: "${event.data}"`)
      }

      worker.postMessage('Hello!')
    }
  }
}
