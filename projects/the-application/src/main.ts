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

          appRef = moduleRef.injector.get<ApplicationRef>(ApplicationRef)
          comRef = appRef.components[0]

          enableDebugTools(comRef)
        }

        if (environment.analytics) {
          function createGoogleTag(
            w: Window & typeof globalThis,
            d: Document,
            s: 'script',
            l: 'dataLayer',
            i: 'GTM-KWJDQHW'
          ): void {
            w[l] = w[l] || []
            w[l].push({
              'gtm.start': new Date().getTime(),
              event: 'gtm.js'
            })
            let dl: string
            let f: HTMLScriptElement
            let j: HTMLScriptElement

            f = d.getElementsByTagName<'script'>(s)[0]
            j = d.createElement<'script'>(s)
            dl = l !== 'dataLayer' ? '&l=' + l : ''
            j.async = true
            j.src = 'https://www.googletagmanager.com/gtm.js?id=' + i + dl
            f.parentNode.insertBefore<HTMLScriptElement>(j, f)
          }

          createGoogleTag(
            window,
            document,
            'script',
            'dataLayer',
            'GTM-KWJDQHW'
          )
        }
      })
      .catch<void>((error): void => {
        console.error(error)
      })
  })
})
