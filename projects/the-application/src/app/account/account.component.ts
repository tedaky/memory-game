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
}
