import { ChangeDetectionStrategy, Component } from '@angular/core'

import { LegalBase } from '../legal-base.component'

@Component({
  selector: 'app-cookie-policy',
  templateUrl: './cookie-policy.component.html',
  styleUrls: ['../legal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CookiePolicyComponent extends LegalBase {}
