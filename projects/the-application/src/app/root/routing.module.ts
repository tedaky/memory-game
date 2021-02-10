import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

import { MainModule } from '../main/main.module'
import { MasterModule } from '../master/master.module'
import { redirect } from '../redirect/redirect'
import { RouteGuard } from '../route/route.guard'

const routes: Routes = [
  {
    path: '',
    loadChildren: async (): Promise<typeof MasterModule> => {
      const m = await import('../master/master.module')
      return m.MasterModule
    }
  },
  {
    path: ':lang',
    canActivate: [RouteGuard],
    loadChildren: async (): Promise<typeof MainModule> => {
      const m = await import('../main/main.module')
      return m.MainModule
    }
  },
  {
    path: '**',
    redirectTo: `${redirect() || 'en'}/login`
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
