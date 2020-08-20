import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { StatisticsComponent } from './statistics.component'
import { HighScoresComponent } from '../high-scores/high-scores.component'
import { RecentScoresService } from '../recent-scores/recent-scores.service'
import { StatisticsService } from './statistics.service'
import { HighScoresService } from '../high-scores/high-scores.service'
import { DatabaseService } from '../database/database.service'
import { RecentScoresComponent } from '../recent-scores/recent-scores.component'

describe('StatisticsComponent', () => {
  let component: StatisticsComponent
  let fixture: ComponentFixture<StatisticsComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        HighScoresComponent,
        RecentScoresComponent,
        StatisticsComponent
      ]
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(StatisticsComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
