import { ComponentFixture, TestBed } from '@angular/core/testing'

import { LinkUnlinkProviderComponent } from './link-unlink-provider.component'

describe('LinkUnlinkProviderComponent', () => {
  let component: LinkUnlinkProviderComponent
  let fixture: ComponentFixture<LinkUnlinkProviderComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LinkUnlinkProviderComponent]
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(LinkUnlinkProviderComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
