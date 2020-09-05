import { MediaMatcher } from '@angular/cdk/layout'
import {
  ChangeDetectorRef,
  Component,
  Inject,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
  ViewChild
} from '@angular/core'
import { MatDialog } from '@angular/material/dialog'
import { interval } from 'rxjs'
import { take } from 'rxjs/operators'

import { Card } from '../card/card'
import { CardsService } from '../cards/cards.service'
import { flipAnimation } from '../flip-animation/flip-animation'
import { GameEndComponent } from '../game-end/game-end.component'
import { Statistic } from '../statistic/statistic'
import { StatisticsService } from '../statistics/statistics.service'
import { StopwatchComponent } from '../stopwatch/stopwatch.component'

@Component({
  selector: 'app-game',
  styleUrls: ['./game.component.scss'],
  templateUrl: './game.component.html',
  animations: [flipAnimation]
})
export class GameComponent implements OnDestroy, OnInit {
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
  public mediaMatcherQuery: MediaQueryList

  /**
   * Stopwatch component.
   */
  @ViewChild(StopwatchComponent, { static: true })
  public stopwatch: StopwatchComponent

  constructor(
    @Inject(PLATFORM_ID) private readonly platformId: string,
    private changeDetectorRef: ChangeDetectorRef,
    private matDialog: MatDialog,
    private mediaMatcher: MediaMatcher,
    private statistics: StatisticsService,
    public cards: CardsService
  ) {}

  private mediaQueryListener(): void {
    return this.changeDetectorRef.detectChanges()
  }

  private createMediaMatcher(): void {
    this.mediaMatcherQuery = this.mediaMatcher.matchMedia(
      '(min-aspect-ratio: 7/10)'
    )
    this.mediaMatcherQuery.addListener(this.mediaQueryListener.bind(this))
  }

  public getCardImage(card: Card): string {
    if (card.flipped === 4 || card.flipped === 3 || card.flipped === 1) {
      return card.image
    } else if (card.flipped === 2) {
      return this.cards.white
    } else if (card.flipped === 0) {
      return this.cards.blank
    }
  }

  public getCardBack(card: Card): string {
    if (card.flipped === 3 || card.flipped === 1 || card.flipped === 0) {
      return this.cards.blank
    } else if (card.flipped === 4) {
      return card.image
    } else if (card.flipped === 2) {
      return this.cards.white
    }
  }

  /**
   * Check for a match
   */
  private checkForMatch(option0: number, option1: number): void {
    let cardChosen0: Card
    let cardChosen1: Card

    cardChosen0 = this.cards.deck[option0]
    cardChosen1 = this.cards.deck[option1]

    if (cardChosen0.name === cardChosen1.name) {
      interval(500)
        .pipe<number>(take<number>(1))
        .subscribe((): void => {
          if (this.playing) {
            cardChosen0.flipped = 4
            cardChosen1.flipped = 4

            interval(250)
              .pipe<number>(take<number>(1))
              .subscribe((): void => {
                if (this.playing) {
                  cardChosen0.flipped = 2
                  cardChosen1.flipped = 2
                }
              })
          }
        })

      this.cardsWon.push([cardChosen0.name, cardChosen1.name])
    } else {
      interval(500)
        .pipe<number>(take<number>(1))
        .subscribe((): void => {
          if (this.playing) {
            cardChosen0.flipped = 3
            cardChosen1.flipped = 3

            interval(250)
              .pipe<number>(take<number>(1))
              .subscribe((): void => {
                if (this.playing) {
                  cardChosen0.flipped = 0
                  cardChosen1.flipped = 0
                }
              })
          }
        })
    }

    if (this.cardsWon.length === 6) {
      interval(768)
        .pipe<number>(take<number>(1))
        .subscribe((): void => {
          this.playing = false
        })

      let statistic: Statistic

      this.stopwatch.stop()

      statistic = new Statistic(
        this.stopwatch.milliseconds,
        this.stopwatch.seconds,
        this.stopwatch.minutes,
        this.stopwatch.hours,
        this.flips
      )

      interval(500)
        .pipe<number>(take<number>(1))
        .subscribe((): void => {
          this.matDialog
            .open(GameEndComponent, {
              data: statistic,
              disableClose: true
            })
            .afterClosed()
            .subscribe((val: string): void => {
              if (val === 'reset') {
                this.reset(new Event('click') as MouseEvent)
              }
            })
        })

      this.statistics.addStatistic(statistic)
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
   * Flip card and check properties.
   *
   * @param event event that flipped the card
   * @param index card number
   */
  public flipCard(event: MouseEvent, index: number): void {
    event.preventDefault()

    if (!this.playing) {
      this.playing = true
      this.stopwatch.restart()
    }

    if (!this.cards.deck[index].flipped && !this.checking) {
      let option0: number
      let option1: number

      this.flips++
      this.cardsChosenId.push(index)

      option0 = this.cardsChosenId[0]
      option1 = this.cardsChosenId[1]

      if (
        this.cardsChosenId.length === 2 &&
        this.cards.deck[option0].name === this.cards.deck[option1].name &&
        this.unFlipped.includes(option1)
      ) {
        let swap0: Card
        let swap1: Card
        let found: number

        swap0 = this.cards.deck[option1]

        found = this.unFlipped.findIndex((item: number): boolean => {
          return this.cards.deck[item].name !== swap0.name
        })

        if (found !== -1) {
          swap1 = this.cards.deck[this.unFlipped[found]]
          this.cards.deck[this.unFlipped[found]] = swap0
          this.cards.deck[option1] = swap1
        }
      }

      this.cards.deck[index].flipped = 1

      this.updateFlipped(index)

      if (this.cardsChosenId.length === 2) {
        this.checking = true

        interval(500)
          .pipe<number>(take<number>(1))
          .subscribe((val: number): void => {
            if (this.playing) {
              this.checkForMatch(option0, option1)

              this.checking = false
            } else {
              this.checking = false
            }
          })

        this.cardsChosenId = []
      }
    }
  }

  public ngOnInit(): void {
    this.createMediaMatcher()
    this.reset(new Event('click') as MouseEvent)
  }

  /**
   * Reset the game play.
   *
   * @param event event that initiated the reset.
   */
  public reset(event: MouseEvent): void {
    event.preventDefault()

    this.cards.deck.forEach((card: Card): void => {
      card.flipped = 0
    })

    this.unFlipped = [...Array(this.cards.deck.length).keys()]
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

  public ngOnDestroy(): void {
    this.mediaMatcherQuery.removeListener(this.mediaQueryListener)
  }
}
