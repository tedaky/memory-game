import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

import { CanDeactivateGameGuard } from '../can-deactivate-game/can-deactivate-game.guard'
import { redirect } from '../redirect/redirect'
import { RouteLoction } from '../route-location/route-location'
import { RouteGuard } from '../route/route.guard'

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: `${redirect() || 'en'}/${RouteLoction.Game}`
  },
  {
    path: ':lang',
    canActivate: [RouteGuard],
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: `${redirect() || 'en'}/${RouteLoction.Game}`
      },
      {
        canDeactivate: [CanDeactivateGameGuard],
        loadChildren: () =>
          import('../game/game.module').then(m => m.GameModule),
        path: RouteLoction.Game
      },
      {
        loadChildren: () =>
          import('../high-scores/high-scores.module').then(
            m => m.HighScoresModule
          ),
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
        path: '**',
        redirectTo: RouteLoction.Game
      }
    ]
  },
  {
    path: '**',
    redirectTo: `${redirect() || 'en'}/${RouteLoction.Game}`
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class RootRoutingModule {}
