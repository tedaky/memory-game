import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { TranslateModule, TranslateService } from '@ngx-translate/core'

import { SettingsComponent } from './settings.component'
import { LanguageModule } from '../language/language.module'
import { LanguageService } from '../language/language.service'
import { MaterialModule } from '../material/material.module'
import { SettingsRoutingModule } from './routing/settings-routing.module'
import {
  ROUTE_TOKEN,
  translateModuleOptions
} from '../translate-loader/translate-browser.loader'

/**
 * Settings Module
 */
@NgModule({
  declarations: [SettingsComponent],
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    SettingsRoutingModule,
    TranslateModule.forChild(translateModuleOptions)
  ],
  providers: [{ provide: ROUTE_TOKEN, useValue: 'settings' }],
  bootstrap: [SettingsComponent]
})
/**
 * Settings Module
 */
export class SettingsModule extends LanguageModule {
  constructor(language: LanguageService, translate: TranslateService) {
    super()

    this.langChange(language, translate, 'SettingsModule')
  }
}
