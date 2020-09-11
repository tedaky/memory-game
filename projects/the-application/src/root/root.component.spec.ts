import { async, TestBed } from '@angular/core/testing'
import { MatSnackBarModule } from '@angular/material/snack-bar'
import { RouterTestingModule } from '@angular/router/testing'
import { ServiceWorkerModule } from '@angular/service-worker'

import { RootComponent } from './root.component'
import { environment } from '../environments/environment'
import { HighScoresComponent } from '../high-scores/high-scores.component'
import { RecentScoresComponent } from '../recent-scores/recent-scores.component'
import { StatisticsComponent } from '../statistics/statistics.component'
import { StopwatchComponent } from '../stopwatch/stopwatch.component'

describe('RootComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatSnackBarModule,
        RouterTestingModule,
        ServiceWorkerModule.register('ngsw-worker.js', {
          enabled: environment.production
        })
      ],
      declarations: [
        HighScoresComponent,
        RecentScoresComponent,
        RootComponent,
        StatisticsComponent,
        StopwatchComponent
      ]
    }).compileComponents()
  }))

  it('should create the app', () => {
    const fixture = TestBed.createComponent(RootComponent)
    const app = fixture.componentInstance
    expect(app).toBeTruthy()
  })
})
