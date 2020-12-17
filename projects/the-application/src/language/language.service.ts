import { DOCUMENT, isPlatformBrowser } from '@angular/common'
import { Inject, Injectable, PLATFORM_ID } from '@angular/core'
import { TranslateService } from '@ngx-translate/core'
import { BehaviorSubject } from 'rxjs'

import { MakeArray } from '../utilities/make-array'

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  /**
   * State of the application language.
   *
   * Default: 'en'
   */
  public lang: BehaviorSubject<string>

  @MakeArray() public supported: string[]

  constructor(
    @Inject(PLATFORM_ID) private readonly platformId: string,
    @Inject(DOCUMENT) private document: Document,
    translate: TranslateService
  ) {
    this.lang = new BehaviorSubject<string>(translate.getDefaultLang())
    this.supported = ['bn', 'de', 'en', 'es', 'hi']
  }

  public setBrowser(lang: string, title: string, description: string): void {
    if (isPlatformBrowser(this.platformId)) {
      let html: HTMLElement

      html = this.document.documentElement

      html.lang = lang
      html.querySelector<HTMLTitleElement>('title').innerText = title
      html.querySelector<HTMLMetaElement>(
        'meta[name="description"]'
      ).content = description
      html.querySelector<HTMLLinkElement>(
        'link[rel="manifest"]'
      ).href = `manifest.${lang}.webmanifest`
    }
  }

  public setLang(lang: string): void {
    this.lang.next(lang)
  }
}
