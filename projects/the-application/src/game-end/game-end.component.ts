import { Component, Inject } from '@angular/core'
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'

import { Statistic } from '../statistic/statistic'

@Component({
  selector: 'app-game-end',
  templateUrl: './game-end.component.html'
})
export class GameEndComponent {
  constructor(
    public dialogRef: MatDialogRef<GameEndComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Statistic
  ) {}
}
