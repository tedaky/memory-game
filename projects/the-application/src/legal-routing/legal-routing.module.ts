import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

import { CookiePolicyComponent } from '../legal/cookie-policy/cookie-policy.component'
import { DisclaimerComponent } from '../legal/disclaimer/disclaimer.component'
import { LegalComponent } from '../legal/legal.component'
import { PrivacyPolicyComponent } from '../legal/privacy-policy/privacy-policy.component'
import { TermsOfServiceComponent } from '../legal/terms-of-service/terms-of-service.component'

const routes: Routes = [
  {
    component: LegalComponent,
    path: ''
  },
  {
    component: CookiePolicyComponent,
    path: 'cookie-policy'
  },
  {
    component: DisclaimerComponent,
    path: 'disclaimer'
  },
  {
    component: PrivacyPolicyComponent,
    path: 'privacy-policy'
  },
  {
    component: TermsOfServiceComponent,
    path: 'terms-of-service'
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LegalRoutingModule {}
