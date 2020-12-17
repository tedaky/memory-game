import { isPlatformBrowser } from '@angular/common'
import { Inject, Injectable, PLATFORM_ID } from '@angular/core'
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  UrlSegment
} from '@angular/router'
import { TranslateService } from '@ngx-translate/core'

import { LanguageService } from '../language/language.service'
import { redirect } from '../redirect/redirect'

@Injectable({
  providedIn: 'root'
})
export class RouteGuard implements CanActivate {
  constructor(
    @Inject(PLATFORM_ID) private readonly platformId: string,
    private language: LanguageService,
    private router: Router,
    private translate: TranslateService
  ) {}

  public canActivate(route: ActivatedRouteSnapshot): boolean {
    let set: string
    let supported: boolean

    set = route.params?.lang

    supported = this.language.supported.includes(set)

    if (!supported) {
      let segments: UrlSegment[]
      let fullPath: string[]

      set = redirect() || this.translate.getDefaultLang()

      segments = this.router.getCurrentNavigation().finalUrl?.root?.children
        ?.primary?.segments

      fullPath = segments.map<string>((val: UrlSegment): string => {
        return val.path
      })

      fullPath[0] = set

      this.router.navigate(fullPath)

      return false
    }

    if (isPlatformBrowser(this.platformId)) {
      window.localStorage.setItem('locale', set)
    }

    this.language.setLang(set)

    return true
  }
}
