import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { LegalModule } from '../legal/legal.module'
import { MainModule } from '../main/main.module'
import { redirect } from '../redirect/redirect'
import { RouteGuard } from '../route/route.guard'

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: `${redirect() || 'en'}/login`
  },
  {
    path: 'legal',
    loadChildren: async (): Promise<typeof LegalModule> => {
      const m = await import('../legal/legal.module')
      return m.LegalModule
    }
  },
  {
    path: ':lang',
    canActivate: [RouteGuard],
    loadChildren: async (): Promise<typeof MainModule> => {
      const m = await import('../main/main.module')
      return m.MainModule
    }
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoutingModule {}
