import { NgModule } from '@angular/core'
import { TransferState } from '@angular/platform-browser'
import {
  ServerModule,
  ServerTransferStateModule
} from '@angular/platform-server'
import { Routes, RouterModule } from '@angular/router'
import { TranslateLoader, TranslateModule } from '@ngx-translate/core'

import { RootModule } from './root.module'
import { RootComponent } from './root.component'
import { ShellComponent } from '../shell/shell.component'
import { translateServerLoaderFactory } from '../translate-loader/translate-server.loader'

const routes: Routes = [{ path: 'shell', component: ShellComponent }]

@NgModule({
  imports: [
    RootModule,
    RouterModule.forRoot(routes),
    ServerModule,
    ServerTransferStateModule,
    TranslateModule.forRoot({
      defaultLanguage: 'en',
      loader: {
        provide: TranslateLoader,
        useFactory: translateServerLoaderFactory,
        deps: [TransferState]
      }
    })
  ],
  bootstrap: [RootComponent],
  declarations: [ShellComponent]
})
export class RootServerModule {}
