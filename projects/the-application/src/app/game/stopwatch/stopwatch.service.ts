import { isPlatformBrowser } from '@angular/common'
import { Inject, Injectable, PLATFORM_ID } from '@angular/core'
import { BehaviorSubject } from 'rxjs'

import { ITime, StopwatchState } from '../../time/time.d'
import { isNullOrUndefined } from '../../utilities/is-null-or-undefined'

@Injectable()
export class StopwatchService {
  /**
   * The worker for generating a random deck of cards
   */
  private worker: Worker
  /**
   * Milliseconds
   */
  public milliseconds: number
  /**
   * Seconds
   */
  public seconds: number
  /**
   * Minutes
   */
  public minutes: number
  /**
   * Hours
   */
  public hours: number
  /**
   * Refresh the stopwatch.
   */
  public refresh: BehaviorSubject<'refresh'>

  constructor(@Inject(PLATFORM_ID) private readonly platformId: string) {
    this.refresh = new BehaviorSubject<'refresh'>('refresh')
    this.registerWorker()
  }

  /**
   * register the worker
   */
  private registerWorker(): void {
    if (isPlatformBrowser(this.platformId)) {
      if (!isNullOrUndefined(Worker)) {
        this.worker = new Worker('./worker/worker', {
          type: 'module',
          name: 'stopwatch'
        })

        this.worker.addEventListener(
          'message',
          (event: MessageEvent<ITime>): void => {
            this.hours = event.data.hours
            this.minutes = event.data.minutes
            this.seconds = event.data.seconds
            this.milliseconds = event.data.milliseconds
            this.refresh.next('refresh')
          }
        )
      }
    }
  }

  private post(type: StopwatchState): void {
    if (isPlatformBrowser(this.platformId)) {
      if (!isNullOrUndefined(Worker) && !isNullOrUndefined(this.worker)) {
        this.worker.postMessage(type)
      }
    }
  }

  public pause(): void {
    this.post('pause')
  }
  public reset(): void {
    this.post('reset')
  }
  public restart(): void {
    this.post('restart')
  }
  public start(): void {
    this.post('start')
  }
}
