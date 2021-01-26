import { TranslateService } from '@ngx-translate/core'
import { Subscription } from 'rxjs'

import { LanguageService } from './language.service'

export abstract class LanguageModule {
  protected langChange(
    language: LanguageService,
    translate: TranslateService,
    module: string
  ): void {
    language.lang.subscribe((val: string): void => {
      let sub: Subscription

      sub = translate.use(val).subscribe(
        (): void => {},
        (): void => {
          console.error(`Language "${val}": at "${module}" not found.`)

          translate.setTranslation(val, {}, true)
        },
        (): void => {
          if (sub && sub instanceof Subscription) {
            sub.unsubscribe()
          }
        }
      )
    })
  }
}
