import { isPlatformBrowser } from '@angular/common'
import {
  Component,
  ElementRef,
  Inject,
  OnInit,
  PLATFORM_ID,
  ViewChild
} from '@angular/core'

import { CardsService } from '../cards/cards.service'
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
   * Name of cards flipped.
   */
  private cardsChosen: string[]
  /**
   * Id of cards flipped.
   */
  private cardsChosenId: number[]
  /**
   * Tell if the game is in play.
   */
  private playing: boolean
  /**
   * Tell game that checking is in progress.
   */
  private checking: boolean

  /**
   * Chosen card matches.
   */
  public cardsWon: string[][]
  /**
   * Number of flips.
   */
  public flips: number

  /**
   * Grid of images and end game message.
   */
  @ViewChild('grid', { static: true }) public grid: ElementRef<HTMLDivElement>
  /**
   * Stopwatch component.
   */
  @ViewChild(StopwatchComponent, { static: true })
  public stopwatch: StopwatchComponent

  constructor(
    @Inject(PLATFORM_ID) private platformId: string,
    private statistics: StatisticsService,
    public cards: CardsService
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
    let cards: NodeListOf<HTMLImageElement>
    let option0: number
    let option1: number

    cards = self.grid.nativeElement.querySelectorAll('img')

    option0 = self.cardsChosenId[0]
    option1 = self.cardsChosenId[1]

    if (self.cardsChosen[0] === self.cardsChosen[1]) {
      cards[option0].src = 'assets/white.png'
      cards[option1].src = 'assets/white.png'

      self.cardsWon.push(self.cardsChosen)
    } else {
      cards[option0].src = 'assets/blank.png'
      cards[option1].src = 'assets/blank.png'
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

    self.cardsChosen = []
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

    let flipped: HTMLImageElement

    flipped = event.target as HTMLImageElement

    if (!this.playing) {
      this.playing = true
      this.stopwatch.restart()
    }

    if (flipped.src.match(/blank.png/) && !this.checking) {
      this.flips++
      this.cardsChosen.push(this.cards.cardArray[index].name)
      this.cardsChosenId.push(index)
      flipped.src = this.cards.cardArray[index].image

      if (this.cardsChosen.length === 2) {
        let self: this

        this.checking = true

        self = this

        window.setTimeout(() => {
          self.checkForMatch(self)
          self.checking = false
        }, 500)
      }
    }
  }

  /**
   * Reset the game play.
   *
   * @param event event that initiated the reset.
   */
  public reset(event: Event): void {
    event.preventDefault()

    if (isPlatformBrowser(this.platformId)) {
      let cards: NodeListOf<HTMLImageElement>

      cards = this.grid.nativeElement.querySelectorAll('img')

      cards.forEach((card: HTMLImageElement): void => {
        card.src = 'assets/blank.png'
      })
    }

    this.cardsChosenId = []
    this.cardsChosen = []
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
