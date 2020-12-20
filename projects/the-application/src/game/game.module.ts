import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { TranslateModule, TranslateService } from '@ngx-translate/core'

import { GameComponent } from '../game/game.component'
import { GameEndComponent } from '../game-end/game-end.component'
import { GameRoutingModule } from '../game-routing/game-routing.module'
import { LanguageModule } from '../language/language.module'
import { LanguageService } from '../language/language.service'
import { MaterialModule } from '../material/material.module'
import { StopwatchComponent } from '../stopwatch/stopwatch.component'
import {
  ROUTE_TOKEN,
  translateModuleOptions
} from '../translate-loader/translate-browser.loader'
import { StopwatchService } from '../stopwatch/stopwatch.service'

/**
 * Entry Module
 */
@NgModule({
  declarations: [GameComponent, GameEndComponent, StopwatchComponent],
  imports: [
    CommonModule,
    GameRoutingModule,
    MaterialModule,
    RouterModule,
    TranslateModule.forChild(translateModuleOptions)
  ],
  providers: [{ provide: ROUTE_TOKEN, useValue: 'game' }, StopwatchService],
  entryComponents: [GameEndComponent],
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
