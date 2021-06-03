import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginComponent } from './pages/login/login.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { AuthRountingModule } from './auth-rounting.module';



@NgModule({
  declarations: [
    LoginComponent, 
    RegistroComponent
  ],
  imports: [
    CommonModule,
    AuthRountingModule
  ]
})
export class AuthModule { }
