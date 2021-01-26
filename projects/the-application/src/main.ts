import {
  ApplicationRef,
  ComponentRef,
  enableProdMode,
  NgModuleRef
} from '@angular/core'
import { enableDebugTools } from '@angular/platform-browser'
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic'

import { environment } from './environments/environment'
import { RootComponent } from './app/root/root.component'
import { RootModule } from './app/root/root.module'

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

          appRef = moduleRef.injector.get<ApplicationRef>(ApplicationRef)
          comRef = appRef.components[0]

          enableDebugTools(comRef)
        }
      })
      .catch<void>((error): void => {
        console.error(error)
      })
  })
})
