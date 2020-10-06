import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

import { GameComponent } from '../game/game.component'

const routes: Routes = [
  {
    component: GameComponent,
    path: ''
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GameRoutingModule {}
