import { NgModule } from '@angular/core'
import { ServerModule } from '@angular/platform-server'
import { Routes, RouterModule } from '@angular/router'

import { RootModule } from './root.module'
import { RootComponent } from './root.component'
import { ShellComponent } from '../shell/shell.component'

const routes: Routes = [{ path: 'shell', component: ShellComponent }]

@NgModule({
  imports: [RootModule, ServerModule, RouterModule.forRoot(routes)],
  bootstrap: [RootComponent],
  declarations: [ShellComponent]
})
export class RootServerModule {}
