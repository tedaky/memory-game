import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'

import { LegalComponent } from './legal.component'
import { CookiePolicyComponent } from './cookie-policy/cookie-policy.component'
import { DisclaimerComponent } from './disclaimer/disclaimer.component'
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component'
import { TermsOfServiceComponent } from './terms-of-service/terms-of-service.component'
import { LegalRoutingModule } from '../legal-routing/legal-routing.module'
import { MaterialModule } from '../material/material.module'

@NgModule({
  declarations: [
    CookiePolicyComponent,
    DisclaimerComponent,
    LegalComponent,
    PrivacyPolicyComponent,
    TermsOfServiceComponent
  ],
  imports: [CommonModule, LegalRoutingModule, MaterialModule, RouterModule]
})
export class LegalModule {}
