import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input
} from '@angular/core'
import { MatSlideToggleChange } from '@angular/material/slide-toggle'

import { AuthService } from '../../auth/auth.service'

@Component({
  selector: 'app-link-unlink-provider',
  templateUrl: './link-unlink-provider.component.html',
  styleUrls: ['./link-unlink-provider.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LinkUnlinkProviderComponent {
  public disable: boolean
  @Input() public provider: string

  public get providerId(): string {
    return `${this.provider.toLowerCase()}.com`
  }

  constructor(
    public authService: AuthService,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  public async click(what: MatSlideToggleChange): Promise<void> {
    this.disable = true

    try {
      if (what.checked) {
        await this.authService.providerSignin(this.provider)
      } else {
        await this.authService.unlinkProvider(this.providerId)
      }
    } catch (e) {
      what.source.toggle()
    }

    this.disable = false
    this.changeDetectorRef.markForCheck()
  }
}
