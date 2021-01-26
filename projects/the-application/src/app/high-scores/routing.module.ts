import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

import { HighScoresComponent } from './high-scores.component'

const routes: Routes = [
  {
    component: HighScoresComponent,
    path: ''
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoutingModule {}
