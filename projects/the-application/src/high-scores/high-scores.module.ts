import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { TranslateModule, TranslateService } from '@ngx-translate/core'

import { HighScoresComponent } from './high-scores.component'
import { HighScoresRoutingModule } from '../high-scores-routing/high-scores-routing.module'
import { LanguageModule } from '../language/language.module'
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
    TranslateModule.forChild(translateModuleOptions)
  ],
  providers: [{ provide: ROUTE_TOKEN, useValue: 'high-scores' }],
  bootstrap: [HighScoresComponent]
})
/**
 * Entry Module
 */
export class HighScoresModule extends LanguageModule {
  constructor(language: LanguageService, translate: TranslateService) {
    super()

    this.langChange(language, translate, 'HighScoresModule')
  }
}
