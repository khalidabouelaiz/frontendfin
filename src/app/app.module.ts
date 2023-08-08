import { NgModule, ViewChild, ElementRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule, NgForm } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { DashbComponent } from './dashb/dashb.component';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgbModule, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SharkDirective } from './shark.directive';
import { AboutUsComponent } from './about-us/about-us.component';
import { AdminComponent } from './admin/admin.component';
import { DefaultModule } from './adminn/default/default.module';
import { SocialAuthServiceConfig } from 'angularx-social-login';
import {
  SocialLoginModule,
  GoogleLoginProvider,
  FacebookLoginProvider,
} from 'angularx-social-login';
import { HomeClientComponent } from './home-client/home-client.component';
import { HomeClientnumComponent } from './home-clientnum/home-clientnum.component';
import { MailModalComponent } from './mail/mail.component';
import { AcceuilComponent } from './acceuil/acceuil.component';
import { DebutComponent } from './debut/debut.component';
import { EmployerComponent } from './employer/employer.component';
import { CreateCreationemployerComponent } from './create-creationemployer/create-creationemployer.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignUpComponent,
    DashbComponent,
    SharkDirective,
    AboutUsComponent,
    AdminComponent,
    HomeClientComponent,
    HomeClientnumComponent,
    MailModalComponent,
    AcceuilComponent,
    DebutComponent,
    EmployerComponent,
    CreateCreationemployerComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    MatGridListModule,
    NgxPaginationModule,
    NgbModule,
    DefaultModule,
    SocialLoginModule,
  ],
  providers: [
    NgbActiveModal,
    {
      provide: 'SocialAuthServiceConfig',

      useValue: {
        autoLogin: false,

        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,

            provider: new GoogleLoginProvider(
              '146598031305-pie5o5fj58bkcqmmib0tra0dgqgsr17p.apps.googleusercontent.com'
            ),
          },
        ],
        onError: (err) => {
          console.error(err);
        },
      } as SocialAuthServiceConfig,
    },
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider('1173357356591712'),
          },
        ],
        onError: (err) => {
          console.error(err);
        },
      } as SocialAuthServiceConfig,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
