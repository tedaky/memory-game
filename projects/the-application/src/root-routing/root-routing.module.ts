import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

import { CanDeactivateGame } from '../can-deactivate-game/can-deactivate-game.service'

const routes: Routes = [
  {
    canDeactivate: [CanDeactivateGame],
    loadChildren: () => import('../game/game.module').then(m => m.GameModule),
    path: 'game'
  },
  {
    loadChildren: () =>
      import('../high-scores/high-scores.module').then(m => m.HighScoresModule),
    path: 'high-scores'
  },
  {
    loadChildren: () =>
      import('../leaderboard/leaderboard.module').then(
        m => m.LeaderboardModule
      ),
    path: 'leaderboard'
  },
  {
    loadChildren: () =>
      import('../recent-scores/recent-scores.module').then(
        m => m.RecentScoresModule
      ),
    path: 'recent-scores'
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'game'
  },
  {
    path: '**',
    redirectTo: 'game'
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class RootRoutingModule {}
