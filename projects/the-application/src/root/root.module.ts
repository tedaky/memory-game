import { CommonModule, registerLocaleData } from '@angular/common'
import { HttpClientModule } from '@angular/common/http'
import localeBn from '@angular/common/locales/bn'
import localeBnExtra from '@angular/common/locales/extra/bn'
import localeEn from '@angular/common/locales/en'
import localeEnExtra from '@angular/common/locales/extra/en'
import localeHi from '@angular/common/locales/hi'
import localeHiExtra from '@angular/common/locales/extra/hi'
import localeKn from '@angular/common/locales/kn'
import localeKnExtra from '@angular/common/locales/extra/kn'
import localeTe from '@angular/common/locales/te'
import localeTeExtra from '@angular/common/locales/extra/te'
import { NgModule } from '@angular/core'
import { AngularFireAuthModule } from '@angular/fire/auth'
import { AngularFireModule } from '@angular/fire'
import { AngularFirestoreModule } from '@angular/fire/firestore'
import { FormsModule } from '@angular/forms'
import {
  BrowserModule,
  BrowserTransferStateModule
} from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { RouterModule } from '@angular/router'
import { ServiceWorkerModule } from '@angular/service-worker'
import { TranslateModule, TranslateService } from '@ngx-translate/core'

import { RootComponent } from './root.component'
import { CheckForUpdateComponent } from '../check-for-update/check-for-update.component'
import { environment } from '../environments/environment'
import { InstallComponent } from '../install/install.component'
import { LanguageModule } from '../language/language.module'
import { LanguageService } from '../language/language.service'
import { MainMenuComponent } from '../main-menu/main-menu.component'
import { MaterialModule } from '../material/material.module'
import { redirect } from '../redirect/redirect'
import { RootRoutingModule } from '../root-routing/root-routing.module'
import {
  ROUTE_TOKEN,
  translateModuleOptions
} from '../translate-loader/translate-browser.loader'

/**
 * Entry Module
 */
@NgModule({
  declarations: [
    CheckForUpdateComponent,
    InstallComponent,
    MainMenuComponent,
    RootComponent
  ],
  imports: [
    AngularFireAuthModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    BrowserAnimationsModule,
    BrowserModule.withServerTransition({ appId: 'MemoryGameApp' }),
    BrowserTransferStateModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
    MaterialModule,
    RootRoutingModule,
    RouterModule,
    ServiceWorkerModule.register('./ngsw-worker.js', {
      enabled: environment.production
    }),
    TranslateModule.forRoot(translateModuleOptions)
  ],
  providers: [{ provide: ROUTE_TOKEN, useValue: 'main' }],
  entryComponents: [CheckForUpdateComponent, InstallComponent, RootComponent],
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
    this.registerLocaleData()
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

  private registerLocaleData(): void {
    registerLocaleData(localeBn, 'bn', localeBnExtra)
    registerLocaleData(localeEn, 'en', localeEnExtra)
    registerLocaleData(localeHi, 'hi', localeHiExtra)
    registerLocaleData(localeKn, 'kn', localeKnExtra)
    registerLocaleData(localeTe, 'te', localeTeExtra)
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
