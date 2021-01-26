import { ChangeDetectionStrategy, Component } from '@angular/core'

import { LegalBase } from '../legal-base.component'

@Component({
  selector: 'app-disclaimer',
  templateUrl: './disclaimer.component.html',
  styleUrls: ['../legal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DisclaimerComponent extends LegalBase {}
