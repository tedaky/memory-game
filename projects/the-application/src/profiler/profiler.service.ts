import { Injectable } from '@angular/core'

import { environment } from '../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class ProfilerService {
  public environment: boolean = environment.production

  public profile(): void {
    console.log(
      ((window as any).ng as any).profiler.timeChangeDetection({
        record: true
      })
    )
  }
}
