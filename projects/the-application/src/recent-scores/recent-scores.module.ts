import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { RouterModule } from '@angular/router'
import { TranslateModule, TranslateService } from '@ngx-translate/core'
import { Subscription } from 'rxjs'

import { RecentScoresComponent } from './recent-scores.component'
import { LanguageService } from '../language/language.service'
import { MaterialModule } from '../material/material.module'
import { RecentScoresRoutingModule } from '../recent-scores-routing/recent-scores-routing.module'
import {
  ROUTE_TOKEN,
  translateModuleOptions
} from '../translate-loader/translate-browser.loader'

/**
 * Recent Scores Module
 */
@NgModule({
  declarations: [RecentScoresComponent],
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    RecentScoresRoutingModule,
    RouterModule,
    TranslateModule.forChild(translateModuleOptions)
  ],
  providers: [{ provide: ROUTE_TOKEN, useValue: 'recent-scores' }],
  entryComponents: [RecentScoresComponent],
  bootstrap: [RecentScoresComponent]
})
/**
 * Recent Scores Module
 */
export class RecentScoresModule {
  constructor(language: LanguageService, translate: TranslateService) {
    language.lang.subscribe((lang: string): void => {
      let sub: Subscription

      sub = translate.use(lang).subscribe(
        (): void => {},
        (): void => {
          console.error(
            `Language "${lang}": at "RecentScoresModule" not found.`
          )

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
