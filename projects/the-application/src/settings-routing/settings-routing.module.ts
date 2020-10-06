import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

import { SettingsComponent } from '../settings/settings.component'

const routes: Routes = [
  {
    component: SettingsComponent,
    path: ''
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule {}
