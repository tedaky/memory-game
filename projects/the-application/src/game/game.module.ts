import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { TranslateModule, TranslateService } from '@ngx-translate/core'
import { Subscription } from 'rxjs'

import { GameComponent } from '../game/game.component'
import { GameEndComponent } from '../game-end/game-end.component'
import { GameRoutingModule } from '../game-routing/game-routing.module'
import { LanguageService } from '../language/language.service'
import { MaterialModule } from '../material/material.module'
import { StopwatchComponent } from '../stopwatch/stopwatch.component'
import {
  ROUTE_TOKEN,
  translateModuleOptions
} from '../translate-loader/translate-browser.loader'

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
  providers: [{ provide: ROUTE_TOKEN, useValue: 'game' }],
  entryComponents: [GameEndComponent],
  bootstrap: [GameComponent]
})
/**
 * Entry Module
 */
export class GameModule {
  constructor(language: LanguageService, translate: TranslateService) {
    language.lang.subscribe((lang: string): void => {
      let sub: Subscription

      sub = translate.use(lang).subscribe(
        (): void => {},
        (): void => {
          console.error(`Language "${lang}": at "GameModule" not found.`)

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
