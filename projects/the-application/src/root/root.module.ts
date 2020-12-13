import { CommonModule, isPlatformBrowser } from '@angular/common'
import { HttpClient, HttpClientModule } from '@angular/common/http'
import { APP_ID, Inject, NgModule, PLATFORM_ID } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { RouterModule } from '@angular/router'
import { ServiceWorkerModule } from '@angular/service-worker'
import { TranslateLoader, TranslateModule } from '@ngx-translate/core'
import { TranslateHttpLoader } from '@ngx-translate/http-loader'

import { RootComponent } from './root.component'
import { CheckForUpdateComponent } from '../check-for-update/check-for-update.component'
import { environment } from '../environments/environment'
import { InstallComponent } from '../install/install.component'
import { MainMenuComponent } from '../main-menu/main-menu.component'
import { MaterialModule } from '../material/material.module'
import { RootRoutingModule } from '../root-routing/root-routing.module'

/**
 * Make TranslateHttpLoader with AOT
 *
 * @param http `HttpClient` http dependency
 */
export function translateHttpLoader(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json')
}

/**
 * Entry Module
 */
@NgModule({
  declarations: [
    CheckForUpdateComponent,
    InstallComponent,
    MainMenuComponent,
    RootComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule.withServerTransition({ appId: 'MemoryGameApp' }),
    CommonModule,
    FormsModule,
    HttpClientModule,
    MaterialModule,
    RootRoutingModule,
    RouterModule,
    ServiceWorkerModule.register('./ngsw-worker.js', {
      enabled: environment.production
    }),
    TranslateModule.forRoot({
      defaultLanguage: 'en',
      loader: {
        provide: TranslateLoader,
        useFactory: translateHttpLoader,
        deps: [HttpClient]
      }
    })
  ],
  entryComponents: [CheckForUpdateComponent, InstallComponent, RootComponent],
  bootstrap: [RootComponent]
})
/**
 * Entry Module
 */
export class RootModule {
  constructor(
    /**
     * `PLATFORM_ID` token
     */
    @Inject(PLATFORM_ID) readonly platformId: string,
    /**
     * `APP_ID` token
     */
    @Inject(APP_ID) readonly appId: string
  ) {
    /**
     * Set the string of the `platform` being used
     */
    let platform: string

    if (isPlatformBrowser(platformId)) {
      platform = 'in the browser'
    } else {
      platform = 'on the server'
    }

    console.log(`Running ${platform} with appId=${appId}`)
  }
}
