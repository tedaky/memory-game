import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

import { GameComponent } from '../game/game.component'
import { StatisticsComponent } from '../statistics/statistics.component'

const routes: Routes = [
  {
    component: GameComponent,
    path: 'game',
    pathMatch: 'full'
  },
  {
    component: StatisticsComponent,
    path: 'statistics',
    pathMatch: 'full'
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'game'
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class RootRoutingModule {}
