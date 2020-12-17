import { ChangeDetectionStrategy, Component, Inject } from '@angular/core'
import { MAT_DIALOG_DATA } from '@angular/material/dialog'
import { TranslateService } from '@ngx-translate/core'

import { Statistic } from '../statistic/statistic'

@Component({
  selector: 'app-game-end',
  templateUrl: './game-end.component.html',
  styleUrls: ['./game-end.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GameEndComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Statistic,
    public translate: TranslateService
  ) {}
}
