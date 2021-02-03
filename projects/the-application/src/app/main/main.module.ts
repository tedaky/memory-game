import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'

import { MaterialModule } from '../material/material.module'
import { RoutingModule } from './routing.module'

@NgModule({
  imports: [CommonModule, MaterialModule, RoutingModule]
})
export class MainModule {}
