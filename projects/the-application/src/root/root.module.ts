import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { RouterModule } from '@angular/router'
import { ServiceWorkerModule } from '@angular/service-worker'

import { environment } from '../environments/environment'
import { HighScoresComponent } from '../high-scores/high-scores.component'
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
    RootComponent,
    HighScoresComponent,
    RecentScoresComponent,
    StatisticsComponent,
    StopwatchComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    BrowserAnimationsModule,
    CommonModule,
    MaterialModule,
    RootRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production
    }),
    RouterModule
  ],
  providers: [],
  bootstrap: [RootComponent]
})
/**
 * Entry Module
 */
export class RootModule {}
