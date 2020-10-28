import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { RouterModule } from '@angular/router'

import { HighScoresComponent } from './high-scores.component'
import { HighScoresRoutingModule } from '../high-scores-routing/high-scores-routing.module'
import { MaterialModule } from '../material/material.module'

/**
 * Entry Module
 */
@NgModule({
  declarations: [HighScoresComponent],
  imports: [
    CommonModule,
    FormsModule,
    HighScoresRoutingModule,
    MaterialModule,
    RouterModule
  ],
  entryComponents: [HighScoresComponent],
  bootstrap: [HighScoresComponent]
})
/**
 * Entry Module
 */
export class HighScoresModule {}
