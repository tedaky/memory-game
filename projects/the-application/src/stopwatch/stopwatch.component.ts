import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit
} from '@angular/core'
import { TranslateService } from '@ngx-translate/core'
import { Subscription } from 'rxjs'

import { StopwatchService } from './stopwatch.service'
import { DeviceService } from '../device/device.service'
import { GameService } from '../game/game.service'
import { MakeArray } from '../utilities/make-array'

/**
 * Display a simple stopwatch with
 * `hours`, `minutes`, `seconds`, `milliseconds`
 * with start, stop, continue, and reset functionality.
 */
@Component({
  selector: 'app-stopwatch',
  templateUrl: './stopwatch.component.html',
  styleUrls: ['./stopwatch.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
/**
 * Display a simple stopwatch with
 * `hours`, `minutes`, `seconds`, `milliseconds`
 * with start, stop, continue, and reset functionality.
 */
export class StopwatchComponent implements OnDestroy, OnInit {
  /**
   * The subscription to the stopwatch refresh.
   */
  @MakeArray<StopwatchComponent, Subscription>() private sub: Subscription[]

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private device: DeviceService,
    private game: GameService,
    public stopwatch: StopwatchService,
    public translate: TranslateService
  ) {}

  /**
   * Continue the stopwatch.
   */
  public continue(): void {
    this.stopwatch.start()
  }

  public ngOnDestroy(): void {
    this.unsubscribe()
  }

  public ngOnInit(): void {
    this.sub[0] = this.stopwatch.refresh.subscribe((): void => {
      this.changeDetectorRef.markForCheck()
    })

    this.sub[1] = this.device.active.subscribe((val: boolean): void => {
      if (!val) {
        this.stop()
        return
      }
      if (val && this.game.playing.value) {
        this.continue()
      }
    })
  }

  /**
   * Stop the stopwatch and set back to 0 time.
   */
  public reset(): void {
    this.stopwatch.reset()
  }

  /**
   * Reset the stopwatch and start.
   */
  public restart(): void {
    this.stopwatch.restart()
  }

  /**
   * Stop the stopwatch.
   */
  public stop(): void {
    this.stopwatch.pause()
  }

  /**
   * Unsubscribe from the stopwatch timer.
   */
  public unsubscribe(): void {
    this.sub.forEach((item: Subscription): void => {
      if (item && item instanceof Subscription) {
        item.unsubscribe()
      }
    })
  }
}
