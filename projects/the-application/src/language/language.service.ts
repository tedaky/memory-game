import { DOCUMENT, isPlatformBrowser } from '@angular/common'
import { Inject, Injectable, PLATFORM_ID } from '@angular/core'
import { TranslateService } from '@ngx-translate/core'
import { BehaviorSubject } from 'rxjs'

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

  constructor(
    @Inject(PLATFORM_ID) private readonly platformId: string,
    @Inject(DOCUMENT) private document: Document,
    private translate: TranslateService
  ) {
    this.lang = new BehaviorSubject<string>('en')
  }

  public setLang(lang: string): void {
    this.lang.next(lang)

    if (isPlatformBrowser(this.platformId)) {
      this.document.documentElement.lang = lang
    }

    this.translate.use(lang)
  }
}
