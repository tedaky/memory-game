import {
  makeStateKey,
  StateKey,
  TransferState
} from '@angular/platform-browser'
import { TranslateLoader } from '@ngx-translate/core'
import { readFileSync } from 'fs'
import { join } from 'path'
import { Observable, Subscriber } from 'rxjs'

export class TranslateServerLoader implements TranslateLoader {
  constructor(private transferState: TransferState) {}

  public getTranslation(lang: string): Observable<{ [key: string]: string }> {
    return new Observable(
      (observer: Subscriber<{ [key: string]: string }>): void => {
        let assetsFolder: string
        let jsonData: { [key: string]: string }
        let key: StateKey<number>

        assetsFolder = join(process.cwd(), 'docs', 'assets', 'i18n', 'shell')

        jsonData = JSON.parse(
          readFileSync(`${assetsFolder}/${lang}.json`, 'utf8')
        )

        // Here we save the translations in the transfer-state
        key = makeStateKey<number>('transfer-translate-' + lang)
        this.transferState.set<{ [key: string]: string }>(key, jsonData)

        observer.next(jsonData)
        observer.complete()
      }
    )
  }
}

export function translateServerLoaderFactory(
  transferState: TransferState
): TranslateServerLoader {
  return new TranslateServerLoader(transferState)
}
