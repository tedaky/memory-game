import { ChangeDetectionStrategy, Component } from '@angular/core'

import { LegalBase } from '../legal-base.component'

@Component({
  selector: 'app-privacy-policy',
  templateUrl: './privacy-policy.component.html',
  styleUrls: ['../legal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PrivacyPolicyComponent extends LegalBase {}
