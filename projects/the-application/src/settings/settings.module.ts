import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { RouterModule } from '@angular/router'

import { SettingsComponent } from './settings.component'
import { MaterialModule } from '../material/material.module'
import { SettingsRoutingModule } from '../settings-routing/settings-routing.module'

/**
 * Settings Module
 */
@NgModule({
  declarations: [SettingsComponent],
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    SettingsRoutingModule,
    RouterModule
  ],
  entryComponents: [SettingsComponent],
  bootstrap: [SettingsComponent]
})
/**
 * Settings Module
 */
export class SettingsModule {}
