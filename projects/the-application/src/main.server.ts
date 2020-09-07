/***************************************************************************************************
 * Load `$localize` onto the global scope - used if i18n tags appear in Angular templates.
 */
import '@angular/localize/init'

import { enableProdMode } from '@angular/core'
export { renderModule, renderModuleFactory } from '@angular/platform-server'

import { environment } from './environments/environment'

if (environment.production) {
  enableProdMode()
}

export { RootServerModule as AppServerModule } from './root/root.server.module'
