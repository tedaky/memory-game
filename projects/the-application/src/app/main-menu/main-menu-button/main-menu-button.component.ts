import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core'
import { RouterLinkActive } from '@angular/router'

import { LanguageService } from '../../language/language.service'

type MenuButton = [MouseEvent, string, RouterLinkActive]

@Component({
  selector: 'app-main-menu-button',
  templateUrl: './main-menu-button.component.html',
  styleUrls: ['./main-menu-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainMenuButtonComponent {
  @Input() public icon: string
  @Input() public label: string
  @Input() public route: string
  @Input() public theme: string

  @Output() public setTheme: EventEmitter<MenuButton>

  public signalTheme(
    event: MouseEvent,
    theme: string,
    routerLinkActive: RouterLinkActive
  ): void {
    event.preventDefault()

    this.setTheme.emit([event, theme, routerLinkActive])
  }

  constructor(public language: LanguageService) {
    this.setTheme = new EventEmitter<MenuButton>()
  }
}
