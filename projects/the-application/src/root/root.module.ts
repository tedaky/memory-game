import { CommonModule, isPlatformBrowser } from '@angular/common'
import { APP_ID, Inject, NgModule, PLATFORM_ID } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { RouterModule } from '@angular/router'
import { ServiceWorkerModule } from '@angular/service-worker'

import { CheckForUpdateComponent } from '../check-for-update/check-for-update.component'
import { environment } from '../environments/environment'
import { GameComponent } from '../game/game.component'
import { GameEndComponent } from '../game-end/game-end.component'
import { HighScoresComponent } from '../high-scores/high-scores.component'
import { InstallComponent } from '../install/install.component'
import { LeaderboardComponent } from '../leaderboard/leaderboard.component'
import { MainMenuComponent } from '../main-menu/main-menu.component'
import { MaterialModule } from '../material/material.module'
import { RecentScoresComponent } from '../recent-scores/recent-scores.component'
import { RootComponent } from './root.component'
import { RootRoutingModule } from '../root-routing/root-routing-routing.module'
import { StatisticsComponent } from '../statistics/statistics.component'
import { StopwatchComponent } from '../stopwatch/stopwatch.component'

/**
 * Entry Module
 */
@NgModule({
  declarations: [
    CheckForUpdateComponent,
    GameComponent,
    GameEndComponent,
    HighScoresComponent,
    InstallComponent,
    LeaderboardComponent,
    MainMenuComponent,
    RecentScoresComponent,
    RootComponent,
    StatisticsComponent,
    StopwatchComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule.withServerTransition({ appId: 'MemoryGameApp' }),
    CommonModule,
    MaterialModule,
    RootRoutingModule,
    RouterModule,
    ServiceWorkerModule.register('./ngsw-worker.js', {
      enabled: environment.production
    })
  ],
  entryComponents: [
    CheckForUpdateComponent,
    GameEndComponent,
    InstallComponent,
    RootComponent
  ],
  bootstrap: [RootComponent]
})
/**
 * Entry Module
 */
export class RootModule {
  constructor(
    /**
     * `PLATFORM_ID` token
     */
    @Inject(PLATFORM_ID) readonly platformId: string,
    /**
     * `APP_ID` token
     */
    @Inject(APP_ID) readonly appId: string
  ) {
    /**
     * Set the string of the `platform` being used
     */
    let platform: string

    if (isPlatformBrowser(platformId)) {
      platform = 'in the browser'
    } else {
      platform = 'on the server'
    }

    console.log(`Running ${platform} with appId=${appId}`)
  }
}
