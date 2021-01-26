import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Inject
} from '@angular/core'
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'

@Component({
  selector: 'app-error-notice',
  templateUrl: './error-notice.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ErrorNoticeComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { message: string },
    private dialog: MatDialogRef<ErrorNoticeComponent>,
    public changeDetectorRef: ChangeDetectorRef
  ) {}

  public dismiss(): void {
    this.dialog.close()
  }
}
