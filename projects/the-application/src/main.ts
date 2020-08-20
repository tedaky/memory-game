import { enableProdMode } from '@angular/core'
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic'

import { environment } from './environments/environment'
import { RootModule } from './root/root.module'

if (environment.production) {
  enableProdMode()
}

document.addEventListener('DOMContentLoaded', (): void => {
  platformBrowserDynamic()
    .bootstrapModule<RootModule>(RootModule)
    .catch<void>((error): void => {
      console.error(error)
    })
})
