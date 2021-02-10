import { isPlatformBrowser } from '@angular/common'
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Inject,
  PLATFORM_ID,
  ViewChild
} from '@angular/core'
import { MatRipple } from '@angular/material/core'
import { ActivatedRoute, RouterOutlet } from '@angular/router'

import { AuthService } from '../auth/auth.service'
import { BackgroundService } from '../background/background.service'
import { fadeAnimation } from '../fade-animation/fade-animation'
import { LanguageService } from '../language/language.service'
import { ThemeService } from '../theme/theme.service'

@Component({
  selector: 'app-master',
  templateUrl: './master.component.html',
  styleUrls: ['./master.component.scss'],
  animations: [fadeAnimation],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MasterComponent implements AfterViewInit {
  @ViewChild('contentWrapper', { static: true })
  public contentWrapper: ElementRef<HTMLDivElement>

  @ViewChild(MatRipple, { static: true }) ripple: MatRipple

  constructor(
    @Inject(PLATFORM_ID) private readonly platformId: string,
    public theme: ThemeService,
    public authService: AuthService,
    public language: LanguageService,
    background: BackgroundService
  ) {}

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

  public scroll(event: Event): void {
    if (isPlatformBrowser(this.platformId)) {
      let scrollPosition: number

      scrollPosition = (event.target as HTMLDivElement).scrollTop

      window.localStorage.setItem('scroll', scrollPosition.toString())
    }
  }
}
