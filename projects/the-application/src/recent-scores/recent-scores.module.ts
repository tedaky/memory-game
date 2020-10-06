import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'

import { RecentScoresComponent } from './recent-scores.component'
import { MaterialModule } from '../material/material.module'
import { RecentScoresRoutingModule } from '../recent-scores-routing/recent-scores-routing.module'

/**
 * Recent Scores Module
 */
@NgModule({
  declarations: [RecentScoresComponent],
  imports: [
    CommonModule,
    MaterialModule,
    RecentScoresRoutingModule,
    RouterModule
  ],
  entryComponents: [RecentScoresComponent],
  bootstrap: [RecentScoresComponent]
})
/**
 * Recent Scores Module
 */
export class RecentScoresModule {}
