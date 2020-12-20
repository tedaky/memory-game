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

  @MakeArray<LanguageService, string>() public supported: string[]
  @MakeArray<LanguageService, string>() public description: string[]

  constructor(
    @Inject(PLATFORM_ID) private readonly platformId: string,
    @Inject(DOCUMENT) private document: Document,
    translate: TranslateService
  ) {
    this.lang = new BehaviorSubject<string>(translate.getDefaultLang())
    this.supported = ['en']
    this.description = ['English']
  }

  /**
   * If the application is "browser" based set the language, title and description.
   *
   * @param lang `string` the language to set
   * @param title `string` the title of the application to set
   * @param description `string` the description of the application to set
   */
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

  /**
   * Update the emitter with the new language.
   *
   * @param lang `string` the new language
   */
  public setLang(lang: string): void {
    this.lang.next(lang)
  }
}
