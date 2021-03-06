import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { RouterModule } from '@angular/router'
import { TranslateModule } from '@ngx-translate/core'

import { LeaderboardComponent } from './leaderboard.component'
import { LeaderboardRoutingModule } from '../leaderboard-routing/leaderboard-routing.module'
import { MaterialModule } from '../material/material.module'
import { ROUTE_TOKEN, translateModuleOptions } from '../translate-loader/translate-browser.loader'

/**
 * Entry Module
 */
@NgModule({
  declarations: [LeaderboardComponent],
  imports: [
    CommonModule,
    FormsModule,
    LeaderboardRoutingModule,
    MaterialModule,
    RouterModule,
    TranslateModule.forChild(translateModuleOptions)
  ],
  providers: [{ provide: ROUTE_TOKEN, useValue: 'leaderboard' }],
  entryComponents: [LeaderboardComponent],
  bootstrap: [LeaderboardComponent]
})
/**
 * Entry Module
 */
export class LeaderboardModule {}
