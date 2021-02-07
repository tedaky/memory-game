import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { TranslateModule, TranslateService } from '@ngx-translate/core'

import { AccountComponent } from './account.component'
import { RoutingModule } from './routing.module'
import { MaterialModule } from '../material/material.module'
import { LanguageModule } from '../language/language.module'
import { LanguageService } from '../language/language.service'
import {
  ROUTE_TOKEN,
  translateModuleOptions
} from '../translate-loader/translate-browser.loader'
import { LinkUnlinkProviderComponent } from './link-unlink-provider/link-unlink-provider.component'

@NgModule({
  declarations: [AccountComponent, LinkUnlinkProviderComponent],
  imports: [
    RoutingModule,
    CommonModule,
    MaterialModule,
    TranslateModule.forChild(translateModuleOptions)
  ],
  providers: [{ provide: ROUTE_TOKEN, useValue: 'account' }],
  bootstrap: [AccountComponent]
})
export class AccountModule extends LanguageModule {
  constructor(language: LanguageService, translate: TranslateService) {
    super()

    this.langChange(language, translate, 'GameModule')
  }
}
