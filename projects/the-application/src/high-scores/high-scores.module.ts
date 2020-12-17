import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { RouterModule } from '@angular/router'
import { TranslateModule, TranslateService } from '@ngx-translate/core'
import { Subscription } from 'rxjs'

import { HighScoresComponent } from './high-scores.component'
import { HighScoresRoutingModule } from '../high-scores-routing/high-scores-routing.module'
import { LanguageService } from '../language/language.service'
import { MaterialModule } from '../material/material.module'
import {
  ROUTE_TOKEN,
  translateModuleOptions
} from '../translate-loader/translate-browser.loader'

/**
 * Entry Module
 */
@NgModule({
  declarations: [HighScoresComponent],
  imports: [
    CommonModule,
    FormsModule,
    HighScoresRoutingModule,
    MaterialModule,
    RouterModule,
    TranslateModule.forChild(translateModuleOptions)
  ],
  providers: [{ provide: ROUTE_TOKEN, useValue: 'high-scores' }],
  entryComponents: [HighScoresComponent],
  bootstrap: [HighScoresComponent]
})
/**
 * Entry Module
 */
export class HighScoresModule {
  constructor(language: LanguageService, translate: TranslateService) {
    language.lang.subscribe((lang: string): void => {
      let sub: Subscription

      sub = translate.use(lang).subscribe(
        (): void => {},
        (): void => {
          console.error(`Language "${lang}": at "HighScoresModule" not found.`)

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
