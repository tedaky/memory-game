import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { RecentScoresComponent } from './recent-scores.component'

describe('RecentScoresComponent', () => {
  let component: RecentScoresComponent
  let fixture: ComponentFixture<RecentScoresComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RecentScoresComponent]
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(RecentScoresComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
