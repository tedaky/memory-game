import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { RouterModule } from '@angular/router'
import { TranslateModule } from '@ngx-translate/core'

import { SettingsComponent } from './settings.component'
import { LanguageComponent } from '../language/language.component'
import { MaterialModule } from '../material/material.module'
import { SettingsRoutingModule } from '../settings-routing/settings-routing.module'

/**
 * Settings Module
 */
@NgModule({
  declarations: [LanguageComponent, SettingsComponent],
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    SettingsRoutingModule,
    RouterModule,
    TranslateModule.forChild()
  ],
  entryComponents: [SettingsComponent],
  bootstrap: [SettingsComponent]
})
/**
 * Settings Module
 */
export class SettingsModule {}
