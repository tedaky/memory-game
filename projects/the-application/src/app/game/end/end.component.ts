import { ChangeDetectionStrategy, Component, Inject } from '@angular/core'
import { MAT_DIALOG_DATA } from '@angular/material/dialog'
import { TranslateService } from '@ngx-translate/core'

import { Statistic } from '../../statistic/statistic'

@Component({
  selector: 'app-end',
  templateUrl: './end.component.html',
  styleUrls: ['./end.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EndComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Statistic,
    public translate: TranslateService
  ) {}
}
