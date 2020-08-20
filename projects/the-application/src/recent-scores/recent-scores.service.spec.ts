import { TestBed } from '@angular/core/testing'

import { RecentScoresService } from './recent-scores.service'

describe('RecentScoresService', () => {
  let service: RecentScoresService

  beforeEach(() => {
    TestBed.configureTestingModule({})
    service = TestBed.inject(RecentScoresService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })
})
