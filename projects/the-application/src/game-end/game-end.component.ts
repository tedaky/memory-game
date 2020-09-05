import { Component, Inject } from '@angular/core'
import { MAT_DIALOG_DATA } from '@angular/material/dialog'

import { Statistic } from '../statistic/statistic'

@Component({
  selector: 'app-game-end',
  templateUrl: './game-end.component.html'
})
export class GameEndComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: Statistic) {}
}
