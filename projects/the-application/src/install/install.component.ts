import { Component, HostBinding } from '@angular/core'
import { MatSnackBarRef } from '@angular/material/snack-bar'

@Component({
  selector: 'app-install',
  templateUrl: './install.component.html',
  styleUrls: ['./install.component.scss']
})
export class InstallComponent {
  @HostBinding('class.mat-simple-snackbar') private get simple(): true {
    return true
  }

  constructor(private snack: MatSnackBarRef<InstallComponent>) {}

  public dismiss(withAction: boolean): void {
    if (withAction) {
      this.snack.dismissWithAction()
    } else {
      this.snack.dismiss()
    }
  }
}
