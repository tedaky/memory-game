import {
  ApplicationRef,
  ComponentRef,
  enableProdMode,
  NgModuleRef
} from '@angular/core'
import { enableDebugTools } from '@angular/platform-browser'
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic'

import { environment } from './environments/environment'
import { RootComponent } from './root/root.component'
import { RootModule } from './root/root.module'

if (environment.production) {
  enableProdMode()
}

window.document.addEventListener('DOMContentLoaded', (): void => {
  window.requestAnimationFrame((): void => {
    platformBrowserDynamic()
      .bootstrapModule<RootModule>(RootModule)
      .then((moduleRef: NgModuleRef<RootModule>): void => {
        if (!environment.production) {
          let appRef: ApplicationRef
          let comRef: ComponentRef<RootComponent>

          appRef = moduleRef.injector.get(ApplicationRef)
          comRef = appRef.components[0]

          enableDebugTools(comRef)
        }
      })
      .catch<void>((error): void => {
        console.error(error)
      })
  })
})
