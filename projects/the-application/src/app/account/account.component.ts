import { ChangeDetectionStrategy, Component } from '@angular/core'

import { AuthService } from '../auth/auth.service'

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccountComponent {
  constructor(public authService: AuthService) {
    const t = authService.credential.user.isAnonymous
  }

  public get isAnonymous(): boolean {
    return this.authService?.credential?.user?.isAnonymous
  }
}
