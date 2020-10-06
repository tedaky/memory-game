import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

import { LeaderboardComponent } from '../leaderboard/leaderboard.component'

const routes: Routes = [
  {
    component: LeaderboardComponent,
    path: ''
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LeaderboardRoutingModule {}
