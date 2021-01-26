import { registerLocaleData } from '@angular/common'
import { NgModule } from '@angular/core'
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
import { TranslateModule } from '@ngx-translate/core'

import { translateModuleOptions } from '../translate-loader/translate-browser.loader'

@NgModule({
  imports: [TranslateModule.forRoot(translateModuleOptions)],
  exports: [TranslateModule]
})
export class LocaleModule {
  constructor() {
    registerLocaleData(localeBn, 'bn', localeBnExtra)
    registerLocaleData(localeEn, 'en', localeEnExtra)
    registerLocaleData(localeHi, 'hi', localeHiExtra)
    registerLocaleData(localeKn, 'kn', localeKnExtra)
    registerLocaleData(localeTe, 'te', localeTeExtra)
  }
}
