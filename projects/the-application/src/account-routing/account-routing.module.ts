import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

import { AccountComponent } from '../account/account.component'

const routes: Routes = [
  {
    component: AccountComponent,
    path: ''
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule {}
