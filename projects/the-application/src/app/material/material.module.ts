import { NgModule } from '@angular/core'
import { MatButtonModule } from '@angular/material/button'
import { MatCardModule } from '@angular/material/card'
import { MatRippleModule } from '@angular/material/core'
import { MatDialogModule } from '@angular/material/dialog'
import { MatGridListModule } from '@angular/material/grid-list'
import { MatIconModule, MatIconRegistry } from '@angular/material/icon'
import { MatSelectModule } from '@angular/material/select'
import { MatSliderModule } from '@angular/material/slider'
import { MatSnackBarModule } from '@angular/material/snack-bar'
import { MatTableModule } from '@angular/material/table'
import { DomSanitizer } from '@angular/platform-browser'

/**
 * Module to export used Material modules
 */
@NgModule({
  exports: [
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatGridListModule,
    MatIconModule,
    MatRippleModule,
    MatSelectModule,
    MatSliderModule,
    MatSnackBarModule,
    MatTableModule
  ]
})
export class MaterialModule {
  constructor(matIconRegistry: MatIconRegistry, domSanitizer: DomSanitizer) {
    const assets = 'assets/social/'

    matIconRegistry
      .addSvgIcon(
        'anonymous',
        domSanitizer.bypassSecurityTrustResourceUrl(`${assets}anonymous.svg`)
      )
      .addSvgIcon(
        'facebook',
        domSanitizer.bypassSecurityTrustResourceUrl(`${assets}facebook.svg`)
      )
      .addSvgIcon(
        'github',
        domSanitizer.bypassSecurityTrustResourceUrl(`${assets}github.svg`)
      )
      .addSvgIcon(
        'google',
        domSanitizer.bypassSecurityTrustResourceUrl(`${assets}google.svg`)
      )
      .addSvgIcon(
        'microsoft',
        domSanitizer.bypassSecurityTrustResourceUrl(`${assets}microsoft.svg`)
      )
      .addSvgIcon(
        'twitter',
        domSanitizer.bypassSecurityTrustResourceUrl(`${assets}twitter.svg`)
      )
      .addSvgIcon(
        'yahoo',
        domSanitizer.bypassSecurityTrustResourceUrl(`${assets}yahoo.svg`)
      )
  }
}
