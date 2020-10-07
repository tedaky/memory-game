import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { HttpClientModule } from '@angular/common/http'
import { RouterModule } from '@angular/router'

import { GameComponent } from '../game/game.component'
import { GameEndComponent } from '../game-end/game-end.component'
import { MaterialModule } from '../material/material.module'
import { StopwatchComponent } from '../stopwatch/stopwatch.component'
import { GameRoutingModule } from '../game-routing/game-routing.module'

/**
 * Entry Module
 */
@NgModule({
  declarations: [GameComponent, GameEndComponent, StopwatchComponent],
  imports: [
    CommonModule,
    GameRoutingModule,
    HttpClientModule,
    MaterialModule,
    RouterModule
  ],
  entryComponents: [GameEndComponent],
  bootstrap: [GameComponent]
})
/**
 * Entry Module
 */
export class GameModule {}
