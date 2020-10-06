import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'

import { RecentScoresComponent } from './recent-scores.component'
import { RecentScoresRoutingModule } from '../recent-scores-routing/recent-scores-routing.module'
import { MaterialModule } from '../material/material.module'

/**
 * Entry Module
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
 * Entry Module
 */
export class RecentScoresModule {}
