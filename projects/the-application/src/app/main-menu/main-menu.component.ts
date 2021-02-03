import { isPlatformBrowser } from '@angular/common'
import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  Input,
  OnDestroy,
  OnInit,
  PLATFORM_ID
} from '@angular/core'
import { loggedIn } from '@angular/fire/auth-guard'
import { MatRipple } from '@angular/material/core'
import { RouterLinkActive } from '@angular/router'
import { of, Subscription } from 'rxjs'

import { AuthService } from '../auth/auth.service'
import { GameService } from '../game/game.service'
import { LanguageService } from '../language/language.service'
import { MenuButton } from '../menu-button/menu-button'
import { RouteLoction } from '../route-location/route-location'
import { ThemeService } from '../theme/theme.service'
import { MakeArray } from '../utilities/make-array'
import { MakeProperty } from '../utilities/make-property'

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainMenuComponent implements OnInit, OnDestroy {
  private sub: Subscription

  @MakeProperty<MainMenuComponent, string>() public lan: string

  @MakeArray<MainMenuComponent, MenuButton>() public menuButtons: MenuButton[]

  @Input() public ripple: MatRipple

  public accountButton: MenuButton

  constructor(
    @Inject(PLATFORM_ID) private readonly platformId: string,
    private game: GameService,
    public auth: AuthService,
    public theme: ThemeService
  ) {}

  public ngOnInit(): void {
    this.menuButtons = []

    const game = new MenuButton(
      'view_module',
      'GAME',
      `${RouteLoction.Game}`,
      'theme-yellow'
    )
    const highScores = new MenuButton(
      'view_headline',
      'HIGH_SCORES',
      `${RouteLoction.HighScores}`,
      'theme-blue'
    )
    const recentScores = new MenuButton(
      'timelapse',
      'RECENT_SCORES',
      `${RouteLoction.RecentScores}`,
      'theme-red'
    )
    // const leaderboard = new MenuButton(
    //   'leaderboard',
    //   'Leaderboard',
    //   `${RouteLoction.Leaderboard}`,
    //   'theme-pink'
    // )
    const settings = new MenuButton(
      'settings',
      'SETTINGS',
      `${RouteLoction.Settings}`,
      'theme-purple'
    )
    const account = new MenuButton(
      'account_circle',
      'ACCOUNT',
      `${RouteLoction.Account}`,
      'theme-green'
    )

    // this.menuButtons = [game, highScores, recentScores, leaderboard, settings]
    this.menuButtons = [game, highScores, recentScores, settings]
    this.accountButton = account
  }

  private launchRipple(x: number, y: number, colour: string): void {
    this.ripple
      .launch(x, y, {
        persistent: true,
        animation: {
          enterDuration: 700,
          exitDuration: 700
        }
      })
      .fadeOut()
  }

  public async setTheme([event, theme, routerLinkActive]: [
    MouseEvent,
    string,
    RouterLinkActive
  ]): Promise<void> {
    if (
      routerLinkActive.isActive ||
      this.game.playing.value ||
      !(await loggedIn(of(this.auth.credential?.user)).toPromise())
    ) {
      return
    }

    if (isPlatformBrowser(this.platformId)) {
      window.localStorage.removeItem('scroll')
    }

    let x: number
    let y: number

    this.theme.setTheme(theme)

    if (!event.clientX && !event.clientY) {
      let element: DOMRect

      element = (event.target as HTMLAnchorElement).getClientRects().item(0)

      x = Math.floor(element.x + element.width / 2)
      y = Math.floor(element.y + element.height / 2)
    } else {
      x = event.clientX
      y = event.clientY
    }

    this.launchRipple(x, y, this.theme.colour)
  }

  public trackBy(index: number, name: MenuButton): string {
    return name.route
  }

  public ngOnDestroy(): void {
    if (this.sub && this.sub instanceof Subscription) {
      this.sub.unsubscribe()
    }
  }
}
