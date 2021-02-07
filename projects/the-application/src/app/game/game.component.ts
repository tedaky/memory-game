import { MediaMatcher } from '@angular/cdk/layout'
import { isPlatformBrowser } from '@angular/common'
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Inject,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
  ViewChild
} from '@angular/core'
import { MatDialog } from '@angular/material/dialog'
import { TranslateService } from '@ngx-translate/core'
import { interval, Subscription } from 'rxjs'
import { take } from 'rxjs/operators'

import { GameService } from './game.service'
import { ICard } from '../card/card.d'
import { CardsService } from '../cards/cards.service'
import { flipAnimation } from '../flip-animation/flip-animation'
import { EndComponent } from './end/end.component'
import { Statistic } from '../statistic/statistic'
import { SettingsService } from '../settings/settings.service'
import { StatisticsService } from '../statistics/statistics.service'
import { StopwatchComponent } from './stopwatch/stopwatch.component'
import { isNullOrUndefined } from '../utilities/is-null-or-undefined'
import { Setting } from '../setting/setting'
import { ProfilerService } from '../profiler/profiler.service'

@Component({
  selector: 'app-game',
  styleUrls: ['./game.component.scss'],
  templateUrl: './game.component.html',
  animations: [flipAnimation],
  changeDetection: ChangeDetectionStrategy.OnPush
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
   * Subscribe to cards update.
   */
  private sub: Subscription
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
   * The total value of effects volume.
   */
  private get effectsVolume(): number {
    return this.game.masterVolume.value * this.game.effectsVolume.value
  }

  /**
   * Columns to display cards in by screen size and deck card count.
   */
  public get columns(): number {
    let cardCount: number
    let num: number
    let pair: { is: number; not: number }

    cardCount = this.cards.deck.length

    switch (cardCount) {
      // case 27:
      //   pair = {
      //     is: 5,
      //     not: 4
      //   }
      //   break

      case 24:
        pair = {
          is: 6,
          not: 4
        }
        break

      case 18:
        pair = {
          is: 5,
          not: 4
        }
        break

      case 16:
        pair = {
          is: 4,
          not: 4
        }
        break

      case 12:
        pair = {
          is: 4,
          not: 3
        }
        break

      case 8:
        pair = {
          is: 3,
          not: 3
        }
        break

      case 6:
        pair = {
          is: 3,
          not: 2
        }
        break

      case 4:
        pair = {
          is: 2,
          not: 2
        }
        break

      default:
        pair = {
          is: 2,
          not: 2
        }
        break
    }

    if (!this.mediaMatcherQuery) {
      return pair.is
    }

    if (this.mediaMatcherQuery.matches) {
      num = pair.is
    } else {
      num = pair.not
    }

    return num
  }

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
    public cards: CardsService,
    public game: GameService,
    public profiler: ProfilerService,
    public settings: SettingsService,
    public translate: TranslateService
  ) {}

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
    return this.changeDetectorRef.markForCheck()
  }

  private createMediaMatcher(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.mediaMatcherQuery = this.mediaMatcher.matchMedia(
        '(min-aspect-ratio: 7/10)'
      )
      // tslint:disable-next-line: deprecation
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
  private checkForMatch(id: number[]): void {
    let cardChosen: ICard[]
    let namesMatch: boolean

    cardChosen = id.reduce<ICard[]>((pv: ICard[], cv: number): ICard[] => {
      pv.push(this.cards.deck[cv])
      return pv
    }, [])

    namesMatch = cardChosen.every(
      (card: ICard, index: number, array: ICard[]): boolean => {
        return card.name === array[0].name
      }
    )

    if (namesMatch) {
      interval(100)
        .pipe<number>(take<number>(1))
        .subscribe((): void => {
          if (this.game.playing.value || this.cardsWon.length) {
            if (id.length === this.game.match.value) {
              cardChosen.forEach((card: ICard): void => {
                card.flipped = 4
              })

              interval(600)
                .pipe<number>(take<number>(1))
                .subscribe((): void => {
                  if (this.game.playing.value || this.cardsWon.length) {
                    cardChosen.forEach((card: ICard): void => {
                      card.flipped = 2
                    })

                    this.changeDetectorRef.markForCheck()
                  }
                })
            }

            this.changeDetectorRef.markForCheck()
          }
        })

      if (id.length === this.game.match.value) {
        this.cardsChosenId = []

        this.cardsWon.push([
          ...cardChosen.map<string>((card: ICard): string => {
            return card.name
          })
        ])
      }
    } else {
      interval(100)
        .pipe<number>(take<number>(1))
        .subscribe((): void => {
          if (this.game.playing.value) {
            cardChosen.forEach((card: ICard): void => {
              card.flipped = 3
            })

            interval(600)
              .pipe<number>(take<number>(1))
              .subscribe((): void => {
                if (this.game.playing.value) {
                  cardChosen.forEach((card: ICard): void => {
                    card.flipped = 0
                  })

                  if (this.effectsVolume > 0) {
                    this.clickSound(0.25 * this.effectsVolume)
                  }

                  this.changeDetectorRef.markForCheck()
                }
              })

            this.changeDetectorRef.markForCheck()
          }
        })

      this.cardsChosenId = []
    }

    if (this.cardsWon.length === this.game.count.value) {
      let statistic: Statistic

      this.stopwatch.stop()
      this.game.playing.next(false)

      statistic = new Statistic(
        this.game.mode.value,
        this.game.match.value,
        this.flips,
        this.game.count.value,
        this.stopwatch.stopwatch.milliseconds,
        this.stopwatch.stopwatch.seconds,
        this.stopwatch.stopwatch.minutes,
        this.stopwatch.stopwatch.hours,
        null,
        null,
        null,
        null
      )

      this.statistics.addStatistic(statistic)

      this.changeDetectorRef.markForCheck()

      interval(500)
        .pipe<number>(take<number>(1))
        .subscribe((): void => {
          this.matDialog
            .open(EndComponent, {
              data: statistic,
              disableClose: true
            })
            .afterClosed()
            .subscribe((val: string): void => {
              if (val === 'reset') {
                this.reset(new Event('click') as MouseEvent)
              }
            })

          interval(250)
            .pipe<number>(take<number>(1))
            .subscribe((): void => {
              this.winReveal()
            })
        })
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
      this.flips++
      this.cardsChosenId.push(index)

      // Swap cards if matched on first flip
      // if (this.game.mode.value === 'regular' && this.game.match.value === 2) {
      //   this.swapFirstMatch(option0, option1)
      // }

      this.cards.deck[index].flipped = 1

      this.updateFlipped(index)

      if (this.cardsChosenId.length > 1) {
        let id: number[]
        this.checking = true

        id = [...this.cardsChosenId]

        interval(250)
          .pipe<number>(take<number>(1))
          .subscribe((): void => {
            if (this.game.playing.value) {
              this.checkForMatch(id)
            }

            this.checking = false
          })
      }

      this.clickSound(this.effectsVolume)
    }
  }

  private winReveal(): void {
    if (!this.game.playing.value) {
      this.cards.deck.forEach((card: ICard): void => {
        card.flipped = 1
      })

      this.changeDetectorRef.markForCheck()
    }
  }

  /**
   * Swap cards if cards match on the very first flip
   *
   * @param option0 `number` index of card deck
   * @param option1 `number` index of card deck
   */
  private swapFirstMatch(option0: number, option1: number): void {
    if (
      this.cardsChosenId.length === this.game.match.value &&
      this.cards.deck[option0].name === this.cards.deck[option1].name &&
      this.unFlipped.includes(option1)
    ) {
      let swap0: ICard
      let swap1: ICard
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
  }

  //#region ngOnInit
  public ngOnInit(): void {
    this.createMediaMatcher()
    this.reset(new Event('click') as MouseEvent)
    this.refreshOnNewCards()
    if (isPlatformBrowser(this.platformId)) {
      this.start(0)
    } else {
      if (!this.settings.settings) {
        this.settings.settings.push(new Setting('match', 2))
      }
    }
  }
  //#endregion ngOnInit

  private refreshOnNewCards(): void {
    this.sub = this.cards.refresh.subscribe((): void => {
      this.changeDetectorRef.markForCheck()
    })
  }

  private start(count: number): void {
    if (isNullOrUndefined(count)) {
      count = 0
    }

    if (count > 100) {
      console.error('Database took too long to initialise')
      return
    }

    this.init()
      .then((): void => {
        this.reset(new Event('click') as MouseEvent)
      })
      .catch((error: DOMException): void => {
        window.requestAnimationFrame((): void => {
          this.start(++count)
        })
      })
  }

  private init(): Promise<void> {
    return new Promise(
      (
        resolve: (value: undefined) => void,
        reject: (reason: undefined) => void
      ): void => {
        if (this.settings.settings.length) {
          resolve(undefined)
        } else {
          reject(undefined)
        }
      }
    )
  }

  //#region reset
  /**
   * Reset the game play.
   *
   * @param event event that initiated the reset.
   */
  public reset(event: MouseEvent): void {
    event.preventDefault()

    this.cards.deck.forEach((card: ICard): void => {
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
    this.stopwatch.reset()
    this.game.playing.next(false)

    this.changeDetectorRef.markForCheck()
  }
  //#endregion reset

  public trackBy(index: number, name: ICard): number {
    return index
  }

  //#region ngOnDestroy
  public ngOnDestroy(): void {
    if (isPlatformBrowser(this.platformId)) {
      // tslint:disable-next-line: deprecation
      this.mediaMatcherQuery.removeListener(this.mediaQueryListener)
      // `removeListener` is deprecated but Safari doesn't support `removeEventListener`
      // this.mediaMatcherQuery.removeEventListener(
      //   'change',
      //   this.mediaQueryListener
      // )
    }
    if (this.sub && this.sub instanceof Subscription) {
      this.sub.unsubscribe()
    }
  }
  //#endregion ngOnDestroy
}
