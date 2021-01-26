import { isPlatformBrowser } from '@angular/common'
import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Inject,
  PLATFORM_ID
} from '@angular/core'
import { MatSnackBarRef } from '@angular/material/snack-bar'

@Component({
  selector: 'app-install',
  templateUrl: './install.component.html',
  styleUrls: ['./install.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InstallComponent {
  @HostBinding('class.mat-simple-snackbar') private get simple(): true {
    return true
  }

  public get forIOS(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      return (
        (/iPhone|iPad|iPod/.test(window.navigator.platform) ||
          (window.navigator.maxTouchPoints > 2 &&
            /MacIntel/.test(window.navigator.platform))) &&
        !/Chrome|CriOS|Firefox|FxiOS/.test(window.navigator.userAgent)
      )
    }

    return false
  }

  constructor(
    @Inject(PLATFORM_ID) private readonly platformId: string,
    private snack: MatSnackBarRef<InstallComponent>
  ) {}

  public dismiss(withAction: boolean): void {
    if (withAction) {
      this.snack.dismissWithAction()
    } else {
      this.snack.dismiss()
    }
  }
}
