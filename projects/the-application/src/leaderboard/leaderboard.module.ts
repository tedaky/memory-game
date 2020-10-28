import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { RouterModule } from '@angular/router'

import { LeaderboardComponent } from './leaderboard.component'
import { LeaderboardRoutingModule } from '../leaderboard-routing/leaderboard-routing.module'
import { MaterialModule } from '../material/material.module'

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
    RouterModule
  ],
  entryComponents: [LeaderboardComponent],
  bootstrap: [LeaderboardComponent]
})
/**
 * Entry Module
 */
export class LeaderboardModule {}
