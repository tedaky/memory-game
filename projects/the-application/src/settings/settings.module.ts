import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { RouterModule } from '@angular/router'
import { TranslateModule, TranslateService } from '@ngx-translate/core'
import { Subscription } from 'rxjs'

import { SettingsComponent } from './settings.component'
import { LanguageComponent } from '../language/language.component'
import { LanguageService } from '../language/language.service'
import { MaterialModule } from '../material/material.module'
import { SettingsRoutingModule } from '../settings-routing/settings-routing.module'
import {
  ROUTE_TOKEN,
  translateModuleOptions
} from '../translate-loader/translate-browser.loader'

/**
 * Settings Module
 */
@NgModule({
  declarations: [LanguageComponent, SettingsComponent],
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    SettingsRoutingModule,
    RouterModule,
    TranslateModule.forChild(translateModuleOptions)
  ],
  providers: [{ provide: ROUTE_TOKEN, useValue: 'settings' }],
  entryComponents: [SettingsComponent],
  bootstrap: [SettingsComponent]
})
/**
 * Settings Module
 */
export class SettingsModule {
  constructor(language: LanguageService, translate: TranslateService) {
    language.lang.subscribe((lang: string): void => {
      let sub: Subscription

      sub = translate.use(lang).subscribe(
        (): void => {},
        (): void => {
          console.error(`Language "${lang}": at "SettingsModule" not found.`)

          translate.setTranslation(lang, {}, true)
        },
        (): void => {
          if (sub && sub instanceof Subscription) {
            sub.unsubscribe()
          }
        }
      )
    })
  }
}
