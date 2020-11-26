import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

import { CanDeactivateGame } from '../can-deactivate-game/can-deactivate-game.service'
import { RouteLoction } from '../route-location/route-location'

const routes: Routes = [
  {
    canDeactivate: [CanDeactivateGame],
    loadChildren: () => import('../game/game.module').then(m => m.GameModule),
    path: RouteLoction.Game
  },
  {
    loadChildren: () =>
      import('../high-scores/high-scores.module').then(m => m.HighScoresModule),
    path: RouteLoction.HighScores
  },
  {
    loadChildren: () =>
      import('../leaderboard/leaderboard.module').then(
        m => m.LeaderboardModule
      ),
    path: RouteLoction.Leaderboard
  },
  {
    loadChildren: () =>
      import('../recent-scores/recent-scores.module').then(
        m => m.RecentScoresModule
      ),
    path: RouteLoction.RecentScores
  },
  {
    loadChildren: () =>
      import('../settings/settings.module').then(m => m.SettingsModule),
    path: RouteLoction.Settings
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: RouteLoction.Game
  },
  {
    path: '**',
    redirectTo: RouteLoction.Game
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class RootRoutingModule {}
