import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { TranslateModule } from '@ngx-translate/core'

import { MasterComponent } from './master.component'
import { RoutingModule } from './routing.module'
import { MainMenuButtonComponent } from '../main-menu/main-menu-button/main-menu-button.component'
import { MainMenuComponent } from '../main-menu/main-menu.component'
import { MaterialModule } from '../material/material.module'

@NgModule({
  declarations: [MasterComponent, MainMenuButtonComponent, MainMenuComponent],
  imports: [CommonModule, MaterialModule, RoutingModule, TranslateModule],
  bootstrap: [MasterComponent]
})
export class MasterModule {}
