import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core'

import { AuthService } from '../auth/auth.service'
import { environment } from '../../environments/environment'

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccountComponent implements OnInit {
  public providers: string[]

  constructor(public authService: AuthService) {}

  public ngOnInit(): void {
    this.providers = environment.providers
  }
}
