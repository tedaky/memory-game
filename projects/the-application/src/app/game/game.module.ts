import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { TranslateModule, TranslateService } from '@ngx-translate/core'

import { GameComponent } from './game.component'
import { EndComponent } from './end/end.component'
import { RoutingModule } from './routing.module'
import { LanguageModule } from '../language/language.module'
import { LanguageService } from '../language/language.service'
import { MaterialModule } from '../material/material.module'
import { StopwatchComponent } from './stopwatch/stopwatch.component'
import {
  ROUTE_TOKEN,
  translateModuleOptions
} from '../translate-loader/translate-browser.loader'
import { StopwatchService } from './stopwatch/stopwatch.service'
import { CardsService } from '../cards/cards.service'

/**
 * Entry Module
 */
@NgModule({
  declarations: [GameComponent, EndComponent, StopwatchComponent],
  imports: [
    CommonModule,
    RoutingModule,
    MaterialModule,
    TranslateModule.forChild(translateModuleOptions)
  ],
  providers: [
    { provide: ROUTE_TOKEN, useValue: 'game' },
    CardsService,
    StopwatchService
  ],
  bootstrap: [GameComponent]
})
/**
 * Entry Module
 */
export class GameModule extends LanguageModule {
  constructor(language: LanguageService, translate: TranslateService) {
    super()

    this.langChange(language, translate, 'GameModule')
  }
}
