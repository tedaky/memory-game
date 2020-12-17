import { CommonModule, registerLocaleData } from '@angular/common'
import { HttpClientModule } from '@angular/common/http'
import localeBn from '@angular/common/locales/bn'
import localeBnExtra from '@angular/common/locales/extra/bn'
import localeDe from '@angular/common/locales/de'
import localeDeExtra from '@angular/common/locales/extra/de'
import localeEn from '@angular/common/locales/en'
import localeEnExtra from '@angular/common/locales/extra/en'
import localeEs from '@angular/common/locales/es'
import localeEsExtra from '@angular/common/locales/extra/es'
import localeHi from '@angular/common/locales/hi'
import localeHiExtra from '@angular/common/locales/extra/hi'
import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'
import {
  BrowserModule,
  BrowserTransferStateModule
} from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { RouterModule } from '@angular/router'
import { ServiceWorkerModule } from '@angular/service-worker'
import { TranslateModule, TranslateService } from '@ngx-translate/core'
import { interval, Subscription } from 'rxjs'

import { RootComponent } from './root.component'
import { CheckForUpdateComponent } from '../check-for-update/check-for-update.component'
import { environment } from '../environments/environment'
import { InstallComponent } from '../install/install.component'
import { LanguageService } from '../language/language.service'
import { MainMenuComponent } from '../main-menu/main-menu.component'
import { MaterialModule } from '../material/material.module'
import { RootRoutingModule } from '../root-routing/root-routing.module'
import {
  ROUTE_TOKEN,
  translateModuleOptions
} from '../translate-loader/translate-browser.loader'
import { redirect } from '../redirect/redirect'

registerLocaleData(localeBn, 'bn', localeBnExtra)
registerLocaleData(localeDe, 'de', localeDeExtra)
registerLocaleData(localeEn, 'en', localeEnExtra)
registerLocaleData(localeEs, 'es', localeEsExtra)
registerLocaleData(localeHi, 'hi', localeHiExtra)

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
export class RootModule {
  constructor(language: LanguageService, translate: TranslateService) {
    let lang: string

    lang = redirect() || translate.getBrowserLang() || 'en'

    translate.setDefaultLang(lang)
    language.setLang(lang)

    language.lang.subscribe((val: string): void => {
      let sub: Subscription
      sub = translate.use(val).subscribe(
        (): void => {},
        (): void => {
          console.error(`Language "${val}": at "RootModule" not found.`)

          translate.setTranslation(val, {}, true)
        },
        (): void => {
          if (sub && sub instanceof Subscription) {
            sub.unsubscribe()
          }
        }
      )
    })

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
