import { TestBed, async } from '@angular/core/testing'

import { RootComponent } from './root.component'
import { HighScoresComponent } from '../high-scores/high-scores.component'
import { RecentScoresComponent } from '../recent-scores/recent-scores.component'
import { StatisticsComponent } from '../statistics/statistics.component'
import { StopwatchComponent } from '../stopwatch/stopwatch.component'

describe('RootComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
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
