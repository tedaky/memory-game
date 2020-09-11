import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { MatSnackBarModule } from '@angular/material/snack-bar'
import { ServiceWorkerModule } from '@angular/service-worker'

import { StopwatchComponent } from './stopwatch.component'
import { DeviceService } from '../device/device.service'
import { environment } from '../environments/environment'

describe('StopwatchComponent', () => {
  let component: StopwatchComponent
  let fixture: ComponentFixture<StopwatchComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatSnackBarModule,
        ServiceWorkerModule.register('ngsw-worker.js', {
          enabled: environment.production
        })
      ],
      declarations: [StopwatchComponent]
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(StopwatchComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
