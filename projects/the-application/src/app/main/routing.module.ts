import { NgModule } from '@angular/core'
import {
  AngularFireAuthGuard,
  AuthPipe,
  redirectLoggedInTo,
  redirectUnauthorizedTo
} from '@angular/fire/auth-guard'
import { Routes, RouterModule } from '@angular/router'

import { AccountModule } from '../account/account.module'
import { CanDeactivateGameGuard } from '../can-deactivate-game/can-deactivate-game.guard'
import { GameModule } from '../game/game.module'
import { HighScoresModule } from '../high-scores/high-scores.module'
import { LeaderboardModule } from '../leaderboard/leaderboard.module'
import { LoginModule } from '../login/login.module'
import { RecentScoresModule } from '../recent-scores/recent-scores.module'
import { redirect } from '../redirect/redirect'
import { RouteLoction } from '../route-location/route-location'
import { SettingsModule } from '../settings/settings.module'

function redirectUnauthorizedToLogin(): AuthPipe {
  return redirectUnauthorizedTo(['/', redirect(), 'login'])
}

function redirectLoggedInToGame(): AuthPipe {
  return redirectLoggedInTo(['/', redirect(), RouteLoction.Game])
}

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: `${redirect() || 'en'}/login`
  },
  {
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectLoggedInToGame },
    loadChildren: async (): Promise<typeof LoginModule> => {
      const m = await import('../login/login.module')
      return m.LoginModule
    },
    path: 'login'
  },
  {
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin },
    canDeactivate: [CanDeactivateGameGuard],
    loadChildren: async (): Promise<typeof GameModule> => {
      const m = await import('../game/game.module')
      return m.GameModule
    },
    path: RouteLoction.Game
  },
  {
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin },
    loadChildren: async (): Promise<typeof HighScoresModule> => {
      const m = await import('../high-scores/high-scores.module')
      return m.HighScoresModule
    },
    path: RouteLoction.HighScores
  },
  // {
  //  canActivate: [AngularFireAuthGuard],
  //  data: { authGuardPipe: redirectUnauthorizedToLogin },
  //   loadChildren: async (): Promise<typeof LeaderboardModule> => {
  //     const m = await import('../leaderboard/leaderboard.module')
  //     return m.LeaderboardModule
  //   },
  //   path: RouteLoction.Leaderboard
  // },
  {
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin },
    loadChildren: async (): Promise<typeof RecentScoresModule> => {
      const m = await import('../recent-scores/recent-scores.module')
      return m.RecentScoresModule
    },
    path: RouteLoction.RecentScores
  },
  {
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin },
    loadChildren: async (): Promise<typeof SettingsModule> => {
      const m = await import('../settings/settings.module')
      return m.SettingsModule
    },
    path: RouteLoction.Settings
  },
  {
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin },
    loadChildren: async (): Promise<typeof AccountModule> => {
      const m = await import('../account/account.module')
      return m.AccountModule
    },
    path: RouteLoction.Account
  },
  {
    path: '**',
    redirectTo: 'login'
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoutingModule {}
