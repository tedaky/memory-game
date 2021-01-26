import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

import { RecentScoresComponent } from '../recent-scores.component'

const routes: Routes = [
  {
    component: RecentScoresComponent,
    path: ''
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecentScoresRoutingModule {}
