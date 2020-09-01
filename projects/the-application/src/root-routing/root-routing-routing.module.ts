import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

import { GameComponent } from '../game/game.component'
import { HighScoresComponent } from '../high-scores/high-scores.component'
import { LeaderboardComponent } from '../leaderboard/leaderboard.component'
import { RecentScoresComponent } from '../recent-scores/recent-scores.component'
import { StatisticsComponent } from '../statistics/statistics.component'

const routes: Routes = [
  {
    component: GameComponent,
    path: 'game',
    pathMatch: 'full'
  },
  {
    component: HighScoresComponent,
    path: 'high-scores',
    pathMatch: 'full'
  },
  {
    component: LeaderboardComponent,
    path: 'leaderboard',
    pathMatch: 'full'
  },
  {
    component: RecentScoresComponent,
    path: 'recent-scores',
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
