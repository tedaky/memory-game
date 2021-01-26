import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { TranslateModule, TranslateService } from '@ngx-translate/core'

import { RecentScoresComponent } from './recent-scores.component'
import { LanguageModule } from '../language/language.module'
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
    TranslateModule.forChild(translateModuleOptions)
  ],
  providers: [{ provide: ROUTE_TOKEN, useValue: 'recent-scores' }],
  bootstrap: [RecentScoresComponent]
})
/**
 * Recent Scores Module
 */
export class RecentScoresModule extends LanguageModule {
  constructor(language: LanguageService, translate: TranslateService) {
    super()

    this.langChange(language, translate, 'RecentScoresModule')
  }
}
