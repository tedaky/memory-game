import { TestBed } from '@angular/core/testing'

import { HighScoresService } from './high-scores.service'

describe('HighScoresService', () => {
  let service: HighScoresService

  beforeEach(() => {
    TestBed.configureTestingModule({})
    service = TestBed.inject(HighScoresService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })
})
