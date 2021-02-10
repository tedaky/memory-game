import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

import { MasterModule } from '../master/master.module'

const routes: Routes = [
  {
    path: '',
    loadChildren: async (): Promise<typeof MasterModule> => {
      const m = await import('../master/master.module')
      return m.MasterModule
    }
  }
]

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      anchorScrolling: 'enabled',
      scrollPositionRestoration: 'enabled'
    })
  ],
  exports: [RouterModule]
})
export class RoutingModule {}
