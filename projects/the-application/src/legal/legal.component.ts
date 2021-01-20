import { ChangeDetectionStrategy, Component } from '@angular/core'
import { LegalBase } from './legal-base.component'

@Component({
  selector: 'app-legal',
  styleUrls: ['./legal.component.scss'],
  templateUrl: './legal.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LegalComponent extends LegalBase {}
