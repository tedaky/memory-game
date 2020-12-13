import { DOCUMENT, isPlatformBrowser } from '@angular/common'
import { Inject, Injectable, PLATFORM_ID } from '@angular/core'
import { ActivatedRouteSnapshot, CanActivate } from '@angular/router'

import { LanguageService } from '../language/language.service'

@Injectable({
  providedIn: 'root'
})
export class RouteGuard implements CanActivate {
  constructor(
    private language: LanguageService
  ) {}

  public canActivate(route: ActivatedRouteSnapshot): boolean {
    let set: string

    set = route.params?.lang || 'en'

    this.language.setLang(set)

    return true
  }
}
