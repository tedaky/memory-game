import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'

import { MaterialModule } from '../material/material.module'
import { LoginComponent } from './login.component'
import { RoutingModule } from './routing.module'
import { SocialLoginButtonComponent } from './social-login-button/social-login-button.component'

@NgModule({
  declarations: [
    LoginComponent,
    SocialLoginButtonComponent
  ],
  imports: [CommonModule, MaterialModule, RoutingModule]
})
export class LoginModule {}
