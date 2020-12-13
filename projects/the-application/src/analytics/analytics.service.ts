import { isPlatformBrowser } from '@angular/common'
import { Inject, Injectable, PLATFORM_ID } from '@angular/core'

import { IStatistic } from '../statistic/statistic.d'

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {
  constructor(@Inject(PLATFORM_ID) private readonly platformId: string) {}

  /**
   * @param event `string` name that is 'event'
   * @param action `string` action that is 'send_score'
   * @param params `IStatistic` parameters for the scores
   */
  public gtag(
    event: 'event',
    action: 'send_score',
    params: IStatistic & { isHighScore?: boolean }
  ): void
  public gtag(): void {
    if (isPlatformBrowser(this.platformId)) {
      // tslint:disable-next-line: whitespace semicolon
      ;(window as any).dataLayer = (window as any).dataLayer || []
      // tslint:disable-next-line: whitespace semicolon
      ;(window as any).dataLayer.push(arguments)
    }
  }
}
