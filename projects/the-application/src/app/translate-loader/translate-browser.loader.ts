import { HttpClient } from '@angular/common/http'
import { InjectionToken } from '@angular/core'
import {
  MissingTranslationHandler,
  MissingTranslationHandlerParams,
  TranslateLoader,
  TranslateModuleConfig,
  TranslateService
} from '@ngx-translate/core'
import { TranslateHttpLoader } from '@ngx-translate/http-loader'
import { Observable, Subscriber, Subscription } from 'rxjs'

export const ROUTE_TOKEN: InjectionToken<string> = new InjectionToken<string>(
  'ROUTE_TOKEN'
)

export function translateBrowserLoaderFactory(
  httpClient: HttpClient,
  route: string
): TranslateHttpLoader {
  return new TranslateHttpLoader(httpClient, `assets/i18n/${route}/`, '.json')
}

export class MissingBrowserTranslateHandler
  implements MissingTranslationHandler {
  private getTranslation(
    key: string,
    lang: string,
    translate: TranslateService
  ): Observable<string> {
    return new Observable<string>((subscriber: Subscriber<string>): void => {
      let fetcher: Subscription

      subscriber.next(key)

      fetcher = translate.getTranslation(lang).subscribe(
        (val: { [key: string]: string }): void => {
          translate.use(lang)

          if (val[key]) {
            subscriber.next(val[key])
          }
        },
        (): void => {
          subscriber.error(`Translation for ${key} in ${lang} not found`)
        },
        (): void => {
          subscriber.complete()

          if (fetcher && fetcher instanceof Subscription) {
            fetcher.unsubscribe()
          }

          if (subscriber) {
            subscriber.unsubscribe()
          }
        }
      )
    })
  }

  public handle(params: MissingTranslationHandlerParams): Observable<string> {
    let lang: string

    lang =
      params?.translateService?.currentLang ||
      params?.translateService?.defaultLang ||
      params?.translateService?.getBrowserLang() ||
      'en'

    return this.getTranslation(params.key, lang, params.translateService)
  }
}

export const translateModuleOptions: TranslateModuleConfig = {
  extend: true,
  isolate: false,
  loader: {
    provide: TranslateLoader,
    useFactory: translateBrowserLoaderFactory,
    deps: [HttpClient, ROUTE_TOKEN]
  },
  missingTranslationHandler: {
    provide: MissingTranslationHandler,
    useClass: MissingBrowserTranslateHandler
  },
  useDefaultLang: true
}
