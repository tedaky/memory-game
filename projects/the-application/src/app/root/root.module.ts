import { CommonModule } from '@angular/common'
import { HttpClientModule } from '@angular/common/http'
import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'
import {
  BrowserModule,
  BrowserTransferStateModule
} from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { ServiceWorkerModule } from '@angular/service-worker'
import { TranslateService } from '@ngx-translate/core'

import { RootComponent } from './root.component'
import { CheckForUpdateComponent } from '../check-for-update/check-for-update.component'
import { environment } from '../../environments/environment'
import { ErrorNoticeComponent } from '../error-notice/error-notice.component'
import { FirebaseModule } from '../firebase/firebase.module'
import { InstallComponent } from '../install/install.component'
import { LanguageModule } from '../language/language.module'
import { LanguageService } from '../language/language.service'
import { LocaleModule } from '../locale/locale.module'
import { MainMenuComponent } from '../main-menu/main-menu.component'
import { MaterialModule } from '../material/material.module'
import { redirect } from '../redirect/redirect'
import { RoutingModule } from './routing.module'
import { ROUTE_TOKEN } from '../translate-loader/translate-browser.loader'

/**
 * Entry Module
 */
@NgModule({
  declarations: [
    CheckForUpdateComponent,
    ErrorNoticeComponent,
    InstallComponent,
    MainMenuComponent,
    RootComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule.withServerTransition({ appId: 'MemoryGameApp' }),
    BrowserTransferStateModule,
    CommonModule,
    FirebaseModule,
    FormsModule,
    HttpClientModule,
    LocaleModule,
    MaterialModule,
    RoutingModule,
    ServiceWorkerModule.register('./ngsw-worker.js', {
      enabled: environment.production
    })
  ],
  providers: [{ provide: ROUTE_TOKEN, useValue: 'main' }],
  bootstrap: [RootComponent]
})
/**
 * Entry Module
 */
export class RootModule extends LanguageModule {
  constructor(language: LanguageService, translate: TranslateService) {
    super()

    this.default(language, translate)
    this.langChange(language, translate, 'RootModule')
    this.translateChange(language, translate)
  }

  private default(
    language: LanguageService,
    translate: TranslateService
  ): void {
    let lang: string

    lang = redirect() || translate.getBrowserLang() || 'en'

    translate.setDefaultLang(lang)
    language.setLang(lang)
  }

  private translateChange(
    language: LanguageService,
    translate: TranslateService
  ): void {
    translate.onLangChange.subscribe(
      (val: {
        lang: string
        translations: { [key: string]: string }
      }): void => {
        language.setBrowser(
          val.lang,
          val.translations.TITLE,
          val.translations.DESCRIPTION
        )
      }
    )
  }
}
