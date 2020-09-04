import { Component, HostBinding } from '@angular/core'
import { MatSnackBarRef } from '@angular/material/snack-bar'

@Component({
  selector: 'app-check-for-update',
  templateUrl: './check-for-update.component.html',
  styleUrls: ['./check-for-update.component.scss']
})
export class CheckForUpdateComponent {
  @HostBinding('class.mat-simple-snackbar') private get simple(): true {
    return true
  }

  constructor(private snack: MatSnackBarRef<CheckForUpdateComponent>) {}

  public dismiss(): void {
    this.snack.dismissWithAction()
  }
}
