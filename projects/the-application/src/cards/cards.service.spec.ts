import { TestBed } from '@angular/core/testing'

import { CardsService } from './cards.service'

describe('CardsService', () => {
  let service: CardsService

  beforeEach(() => {
    TestBed.configureTestingModule({})
    service = TestBed.inject(CardsService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })

  it('should create cards', () => {
    expect(service.deck.length).toEqual(12)
  })

  it('should shuffle cards', () => {
    const spy = spyOn(service, 'shuffle')
    service.shuffle()
    expect(spy).toHaveBeenCalled()
  })
})
