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

  public get isIOS(): boolean {
    return (
      /iPhone|iPad|iPod/.test(window.navigator.platform) ||
      (window.navigator.maxTouchPoints > 2 &&
        /MacIntel/.test(window.navigator.platform))
    )
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
