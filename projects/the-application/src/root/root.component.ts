import { isPlatformBrowser } from '@angular/common'
import {
  Component,
  Inject,
  OnInit,
  PLATFORM_ID,
  ViewChild,
  ElementRef,
  AfterViewInit
} from '@angular/core'
import { MatRipple } from '@angular/material/core'
import { RouterOutlet, ActivatedRoute } from '@angular/router'

import { BackgroundService } from '../background/background.service'
import { CardsService } from '../cards/cards.service'
import { fadeAnimation } from '../fade-animation/fade-animation'
import { ThemeService } from '../theme/theme.service'

/**
 * Root that holds game and statistics.
 */
@Component({
  selector: 'app-root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.scss'],
  animations: [fadeAnimation]
})
/**
 * Root that holds game and statistics.
 */
export class RootComponent implements AfterViewInit, OnInit {
  @ViewChild('contentWrapper', { static: true })
  public contentWrapper: ElementRef<HTMLDivElement>

  @ViewChild(MatRipple, { static: true }) ripple: MatRipple

  constructor(
    @Inject(PLATFORM_ID) private readonly platformId: string,
    public cards: CardsService,
    public theme: ThemeService,
    background: BackgroundService
  ) {}

  private webWorker(): void {
    if (typeof Worker !== 'undefined') {
      let worker: Worker

      worker = new Worker('./root.worker', { type: 'module' })

      worker.onmessage = (event: MessageEvent): void => {
        console.log(`page got message: "${event.data}"`)
      }

      worker.postMessage('Hello!')
    }
  }

  public getRouterOutletState(outlet: RouterOutlet): ActivatedRoute | string {
    let result: ActivatedRoute | string

    if (outlet.isActivated) {
      result = outlet.activatedRoute
    } else {
      result = ''
    }

    return result
  }

  public ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      let scrollPosition: number

      scrollPosition = parseInt(window.localStorage.getItem('scroll'), 10)

      if (!!scrollPosition) {
        this.contentWrapper.nativeElement.scrollTop = scrollPosition
      }
    }
  }

  public ngOnInit(): void {
    this.webWorker()
  }

  public scroll(event: Event): void {
    if (isPlatformBrowser(this.platformId)) {
      let scrollPosition: number

      scrollPosition = (event.target as HTMLDivElement).scrollTop

      window.localStorage.setItem('scroll', scrollPosition.toString())
    }
  }
}
