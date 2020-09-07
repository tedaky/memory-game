import { isPlatformBrowser } from '@angular/common'
import { Component, Inject, Input, OnInit, PLATFORM_ID } from '@angular/core'
import { MatRipple } from '@angular/material/core'
import { RouterLinkActive } from '@angular/router'

import { GameService } from '../game/game.service'
import { MenuButton } from '../menu-button/menu-button'
import { ThemeService } from '../theme/theme.service'

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.scss']
})
export class MainMenuComponent implements OnInit {
  @Input() public ripple: MatRipple

  public menuButtons: MenuButton[]

  constructor(
    @Inject(PLATFORM_ID) private readonly platformId: string,
    private game: GameService,
    public theme: ThemeService
  ) {}

  public ngOnInit(): void {
    this.menuButtons = []

    const game = new MenuButton('view_module', 'Game', 'game', 'theme-yellow')
    const highScores = new MenuButton(
      'view_headline',
      'High Scores',
      'high-scores',
      'theme-blue'
    )
    const recentScores = new MenuButton(
      'timelapse',
      'Recent Scores',
      'recent-scores',
      'theme-red'
    )
    const leaderboard = new MenuButton(
      'leaderboard',
      'Leaderboard',
      'leaderboard',
      'theme-pink'
    )

    this.menuButtons.push(game, highScores, recentScores, leaderboard)
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

  public setTheme(
    event: MouseEvent,
    theme: string,
    routerLinkActive: RouterLinkActive
  ): void {
    event.preventDefault()

    if (routerLinkActive.isActive || this.game.playing.value) {
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
}
