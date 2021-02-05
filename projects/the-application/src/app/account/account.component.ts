import { ChangeDetectionStrategy, Component } from '@angular/core'
import firebase from 'firebase/app'

import { AuthService } from '../auth/auth.service'
import { User } from '../user/user'

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccountComponent {
  constructor(public authService: AuthService) {}

  public isLinkedProvider(user: User, providerId: string): boolean {
    const found = user.providerData.findIndex(
      (provider: firebase.UserInfo): boolean => {
        return provider.providerId === providerId
      }
    )

    return found !== -1
  }
}
