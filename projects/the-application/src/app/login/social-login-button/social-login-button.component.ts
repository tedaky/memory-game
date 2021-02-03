import { ChangeDetectionStrategy, Component, Input } from '@angular/core'

import { AuthService } from '../../auth/auth.service'

@Component({
  selector: 'app-social-login-button',
  templateUrl: './social-login-button.component.html',
  styleUrls: ['./social-login-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SocialLoginButtonComponent {
  @Input() public colour: string
  @Input() public display: string

  public get name(): string {
    if (!this.display) {
      return
    }

    return this.display.slice(0, this.display.length).toLocaleLowerCase()
  }

  public get provider(): string {
    if (!this.display?.length || this.display === 'anonymous') {
      return
    }

    let firstCharacter: string
    let rest: string

    firstCharacter = this.display.slice(0, 1)
    rest = this.display.slice(1, this.display.length).toLocaleLowerCase()

    return firstCharacter + rest
  }

  constructor(public authService: AuthService) {}
}
