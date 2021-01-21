import { ChangeDetectionStrategy, Component } from '@angular/core'

import { LegalBase } from '../legal-base.component'

@Component({
  selector: 'app-terms-of-service',
  templateUrl: './terms-of-service.component.html',
  styleUrls: ['../legal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TermsOfServiceComponent extends LegalBase {}
