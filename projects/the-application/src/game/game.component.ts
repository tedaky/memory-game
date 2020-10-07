import { MediaMatcher } from '@angular/cdk/layout'
import { isPlatformBrowser } from '@angular/common'
import { HttpClient } from '@angular/common/http'
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

import { GameService } from './game.service'
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

  private get effectsVolume(): number {
    return this.game.masterVolume.value * this.game.effectsVolume.value
  }

  /**
   * Stopwatch component.
   */
  @ViewChild(StopwatchComponent, { static: true })
  public stopwatch: StopwatchComponent

  constructor(
    @Inject(PLATFORM_ID) private readonly platformId: string,
    private changeDetectorRef: ChangeDetectorRef,
    private httpClient: HttpClient,
    private matDialog: MatDialog,
    private mediaMatcher: MediaMatcher,
    private statistics: StatisticsService,
    public cards: CardsService,
    public game: GameService
  ) {}

  // private clickSound(volume: number): void {
  //   let clickSound: HTMLAudioElement

  //   try {
  //     clickSound = new Audio('assets/audio/click.mp3')
  //   } catch (error) {
  //     clickSound = new Audio('assets/audio/click.ogg')
  //   }

  //   function playListener(): void {
  //     let audioContext: AudioContext
  //     let gainNode: GainNode
  //     let source: MediaElementAudioSourceNode
  //     let AC: {
  //       new (contextOptions?: AudioContextOptions): AudioContext
  //       prototype: AudioContext
  //     }

  //     AC = window.AudioContext || (window as any).webkitAudioContext

  //     audioContext = new AC()

  //     if (!audioContext.createGain) {
  //       audioContext.createGain = (audioContext as any).createGainNode
  //     }

  //     source = audioContext.createMediaElementSource(clickSound)
  //     gainNode = audioContext.createGain()
  //     gainNode.gain.value = volume
  //     clickSound.volume = volume
  //     source.connect(gainNode)
  //     gainNode.connect(audioContext.destination)
  //   }

  //   clickSound.addEventListener('play', playListener, false)

  //   clickSound.play()
  // }

  private clickSound(volume: number): void {
    let AC: {
      new (contextOptions?: AudioContextOptions): AudioContext
      prototype: AudioContext
    }
    let audioContext: AudioContext
    let bufferSource: AudioBufferSourceNode
    let gainNode: GainNode

    AC = window.AudioContext || (window as any).webkitAudioContext

    audioContext = new AC()

    if (!audioContext.createGain) {
      audioContext.createGain = (audioContext as any).createGainNode
    }

    gainNode = audioContext.createGain()
    gainNode.gain.value = volume

    bufferSource = audioContext.createBufferSource()

    bufferSource.connect(gainNode)

    this.game.clickSoundBuffer().then((res: ArrayBuffer): void => {
      audioContext.decodeAudioData(
        res,
        (decoded: AudioBuffer): void => {
          bufferSource.buffer = decoded

          gainNode.connect(audioContext.destination)

          if (!bufferSource.start) {
            bufferSource.start = (bufferSource as any).noteOn
          }

          bufferSource.start(0)
        },
        (error): void => {
          console.log(error)
        }
      )
    })
  }

  private mediaQueryListener(): void {
    return this.changeDetectorRef.detectChanges()
  }

  private createMediaMatcher(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.mediaMatcherQuery = this.mediaMatcher.matchMedia(
        '(min-aspect-ratio: 7/10)'
      )
      this.mediaMatcherQuery.addListener(this.mediaQueryListener.bind(this))
      // `addListener` is deprecated but Safari doesn't support `addEventListener`
      // this.mediaMatcherQuery.addEventListener(
      //   'change',
      //   this.mediaQueryListener.bind(this)
      // )
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
          if (this.game.playing.value) {
            cardChosen0.flipped = 4
            cardChosen1.flipped = 4

            interval(250)
              .pipe<number>(take<number>(1))
              .subscribe((): void => {
                if (this.game.playing.value) {
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
          if (this.game.playing.value) {
            cardChosen0.flipped = 3
            cardChosen1.flipped = 3

            interval(250)
              .pipe<number>(take<number>(1))
              .subscribe((): void => {
                if (this.game.playing.value) {
                  cardChosen0.flipped = 0
                  cardChosen1.flipped = 0

                  this.clickSound(0.25 * this.effectsVolume)
                }
              })
          }
        })
    }

    if (this.cardsWon.length === this.cards.matchCount) {
      interval(768)
        .pipe<number>(take<number>(1))
        .subscribe((): void => {
          this.game.playing.next(false)
        })

      let statistic: Statistic

      this.stopwatch.stop()

      statistic = new Statistic(
        this.game.mode.value,
        this.game.match.value,
        this.flips,
        this.game.count.value,
        this.stopwatch.milliseconds,
        this.stopwatch.seconds,
        this.stopwatch.minutes,
        this.stopwatch.hours,
        null,
        null,
        null,
        null
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

    if (!this.game.playing.value) {
      this.game.playing.next(true)
      this.stopwatch.restart()
    }

    if (!this.cards.deck[index].flipped && !this.checking) {
      let option0: number
      let option1: number

      this.flips++
      this.cardsChosenId.push(index)

      option0 = this.cardsChosenId[0]
      option1 = this.cardsChosenId[1]

      // Swap cards if matched on first flip
      if (
        this.cardsChosenId.length === this.game.match.value &&
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

      if (this.cardsChosenId.length === this.game.match.value) {
        this.checking = true

        interval(500)
          .pipe<number>(take<number>(1))
          .subscribe((): void => {
            if (this.game.playing.value) {
              this.checkForMatch(option0, option1)
            }
          })

        interval(250)
          .pipe<number>(take<number>(1))
          .subscribe((): void => {
            this.checking = false
          })

        this.cardsChosenId = []
      }

      this.clickSound(this.effectsVolume)
    }
  }

  //#region ngOnInit
  public ngOnInit(): void {
    this.createMediaMatcher()

    this.reset(new Event('click') as MouseEvent)
  }
  //#endregion ngOnInit

  //#region reset
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
    this.game.playing.next(false)
  }
  //#endregion reset

  //#region ngOnDestroy
  public ngOnDestroy(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.mediaMatcherQuery.removeListener(this.mediaQueryListener)
      // `removeListener` is deprecated but Safari doesn't support `removeEventListener`
      // this.mediaMatcherQuery.removeEventListener(
      //   'change',
      //   this.mediaQueryListener
      // )
    }
  }
  //#endregion ngOnDestroy
}
