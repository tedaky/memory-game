import { NgModule } from '@angular/core'
import { MatButtonModule } from '@angular/material/button'
import { MatCardModule } from '@angular/material/card'
import { MatGridListModule } from '@angular/material/grid-list'
import { MatTableModule } from '@angular/material/table'

/**
 * Module to export used Material modules
 */
@NgModule({
  exports: [MatButtonModule, MatCardModule, MatGridListModule, MatTableModule]
})
/**
 * Module to export used Material modules
 */
export class MaterialModule {}
