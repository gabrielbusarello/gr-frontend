import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localePT from '@angular/common/locales/pt';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { ToastrModule } from 'ngx-toastr';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxMaskModule } from 'ngx-mask';

import { UtilsService } from './services/utils.service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { AuthenticationGuard } from './services/authentication-guard.service';
import { AuthenticationService } from './services/authentication.service';

registerLocaleData(localePT, 'pt');

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      progressBar: true,
      progressAnimation: 'increasing',
      preventDuplicates: true
    }),
    NgSelectModule,
    NgxMaskModule.forRoot()
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'pt' },
    UtilsService,
    AuthenticationService,
    AuthenticationGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
