import { NgModule } from '@angular/core'
import { AngularFireAuthGuard } from '@angular/fire/auth-guard'
import { Routes, RouterModule } from '@angular/router'

import { CanDeactivateGameGuard } from '../can-deactivate-game/can-deactivate-game.guard'
import { GameModule } from '../game/game.module'
import { HighScoresModule } from '../high-scores/high-scores.module'
import { LeaderboardModule } from '../leaderboard/leaderboard.module'
import { LegalModule } from '../legal/legal.module'
import { RecentScoresModule } from '../recent-scores/recent-scores.module'
import { redirect } from '../redirect/redirect'
import { RouteLoction } from '../route-location/route-location'
import { RouteGuard } from '../route/route.guard'
import { SettingsModule } from '../settings/settings.module'

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: `${redirect() || 'en'}/${RouteLoction.Game}`
  },
  {
    path: 'legal',
    loadChildren: async (): Promise<typeof LegalModule> => {
      const m = await import('../legal/legal.module')
      return m.LegalModule
    }
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
        loadChildren: async (): Promise<typeof GameModule> => {
          const m = await import('../game/game.module')
          return m.GameModule
        },
        path: RouteLoction.Game
      },
      {
        canActivate: [AngularFireAuthGuard],
        loadChildren: async (): Promise<typeof HighScoresModule> => {
          const m = await import('../high-scores/high-scores.module')
          return m.HighScoresModule
        },
        path: RouteLoction.HighScores
      },
      // {
      //   loadChildren: async (): Promise<typeof LeaderboardModule> => {
      //     const m = await import('../leaderboard/leaderboard.module')
      //     return m.LeaderboardModule
      //   },
      //   path: RouteLoction.Leaderboard
      // },
      {
        canActivate: [AngularFireAuthGuard],
        loadChildren: async (): Promise<typeof RecentScoresModule> => {
          const m = await import('../recent-scores/recent-scores.module')
          return m.RecentScoresModule
        },
        path: RouteLoction.RecentScores
      },
      {
        canActivate: [AngularFireAuthGuard],
        loadChildren: async (): Promise<typeof SettingsModule> => {
          const m = await import('../settings/settings.module')
          return m.SettingsModule
        },
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
