import { ComponentFixture, TestBed } from '@angular/core/testing'

import { MainMenuButtonComponent } from './main-menu-button.component'

describe('MainMenuButtonComponent', () => {
  let component: MainMenuButtonComponent
  let fixture: ComponentFixture<MainMenuButtonComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MainMenuButtonComponent]
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(MainMenuButtonComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
