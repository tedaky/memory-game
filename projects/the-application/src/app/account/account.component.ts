import { ChangeDetectionStrategy, Component } from '@angular/core'

import { AuthService } from '../auth/auth.service'

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccountComponent {
  constructor(public authService: AuthService) {}
}
