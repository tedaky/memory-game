import { isPlatformBrowser } from '@angular/common'
import { Component, Inject, Input, PLATFORM_ID } from '@angular/core'
import { MatRipple } from '@angular/material/core'

import { ThemeService } from '../theme/theme.service'

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.scss']
})
export class MainMenuComponent {
  @Input() public ripple: MatRipple

  constructor(
    @Inject(PLATFORM_ID) private readonly platformId: string,
    public theme: ThemeService
  ) {}

  public setTheme(theme: string, event: MouseEvent): void {
    event.preventDefault()

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
}
