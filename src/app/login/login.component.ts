import {
  Component,
  OnInit,
  NgZone,
  ElementRef,
  HostListener,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  FormBuilder,
} from '@angular/forms';

import { ApiAppService } from '../Service/api-app.service';
import { Router, UrlTree, NavigationExtras } from '@angular/router';
import { HttpClient, HttpHandler, HttpHeaders } from '@angular/common/http';

import { Injectable } from '@angular/core';

import { SocialAuthService } from 'angularx-social-login';
import { JwtHelperService } from '@auth0/angular-jwt';
import jwt_decode from 'jwt-decode';

import {
  FacebookLoginProvider,
  SocialUser,
  SocialLoginModule,
  GoogleLoginProvider,
} from 'angularx-social-login';
declare var google: any;
declare var $: any;
declare var facebook: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  socialUser!: SocialUser;
  isLoggedin?: boolean = undefined;
  @HostListener('document:click', ['$event'])
  closeNavbarOnOutsideClick(event: Event): void {
    const navbar = this.el.nativeElement.querySelector('.navbar-collapse.show');
    if (navbar && !navbar.contains(event.target as Node)) {
      navbar.classList.remove('show');
    }
  }
  decodeToken: any;
  helper = new JwtHelperService();
  loginUserForm: FormGroup;
  user: SocialUser;
  admin = [{ email1: 'administrateur@hotmail.com', password1: 'Admin123' }];
  employerac = [{ email2: 'employer@hotmail.com', password2: '12345678' }];

  constructor(
    public http: HttpClient,
    public apiApp: ApiAppService,
    public router: Router,
    private authService: SocialAuthService,
    private zone: NgZone,
    private formBuilder: FormBuilder,
    private socialAuthService: SocialAuthService,
    private el: ElementRef
  ) {
    console.log(this.isLoggedin);
    this.loginUserForm = new FormGroup({
      email: new FormControl('', [Validators.email, Validators.required]),
      password: new FormControl('', Validators.required),
    });
  }

  UserRegistrationForm: FormGroup;
  loggedIn: any;

  ngOnInit(): void {
    {
      this.authService.authState.subscribe((user) => {
        this.user = user;
        this.loggedIn = user != null;
        console.log(user);
        this.andleCredentialResponse(user);
      });
      if (google.accounts) {
        google.accounts.id.initialize({
          client_id:
            '146598031305-pie5o5fj58bkcqmmib0tra0dgqgsr17p.apps.googleusercontent.com',
          callback: this.handleCredentialResponse.bind(this),
        });
        google.accounts.id.renderButton(
          document.getElementById('buttonDiv'),
          { theme: 'outline', size: 'large' } // customization attributes
        );

        google.accounts.id.prompt();
      }
    }
  }

  loginWithFacebook(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }
  andleCredentialResponse(response: any): void {
    const token = response;
    const authGoogleUser = Object.values(token);
    console.log('nom : ' + authGoogleUser[5]);
    console.log('prenom : ' + authGoogleUser[4]);
    console.log('email : ' + authGoogleUser[2]);

    const facedata = {
      nom: authGoogleUser[5],
      prenom: authGoogleUser[4],
      genre: 'femme',
      email: authGoogleUser[2],
      telephone: '3114',
      password: 'AZERTY',
    };
    if (facedata) {
      this.apiApp
        .login({ email: facedata.email, password: facedata.password })
        .subscribe(
          (res: any) => {
            if (res.status != 'notExist') {
              const authId = res.data.existUser;
              console.log(res);
              this.zone.run(() => {
                this.router.navigateByUrl('/acceuil', { state: authId });
              });
            } else {
              this.apiApp.registerUser(facedata).subscribe({
                next: (res: any) => {
                  console.log(res);
                  this.zone.run(() => {
                    this.router.navigateByUrl('/acceuil', { state: res.data });
                  });
                },
                error: (e) => console.error(e),
              });
            }
          },
          (err) => console.log('error', err)
        );
    }
  }

  handleCredentialResponse(response: any): void {
    const token = response.credential;
    const authGoogleUser = Object.values(jwt_decode(token));
    console.log('nom : ' + authGoogleUser[10]);
    console.log('prenom : ' + authGoogleUser[9]);
    console.log('email : ' + authGoogleUser[4]);

    const dataGoogle = {
      nom: authGoogleUser[10],
      prenom: authGoogleUser[9],
      genre: 'femme',
      email: authGoogleUser[4],
      telephone: '3114',
      password: 'AZERTY',
    };

    if (dataGoogle) {
      this.apiApp
        .login({ email: dataGoogle.email, password: dataGoogle.password })
        .subscribe(
          (res: any) => {
            if (res.status != 'notExist') {
              console.log(res);
              const authId = res.data.existUser;
              this.zone.run(() => {
                this.router.navigateByUrl('/acceuil', { state: authId });
              });
            } else {
              this.apiApp.registerUser(dataGoogle).subscribe({
                next: (res: any) => {
                  console.log(res);
                  this.zone.run(() => {
                    this.router.navigateByUrl('/acceuil', { state: res.data });
                  });
                },
                error: (e) => console.error(e),
              });
            }
          },
          (err) => console.log('error', err)
        );
    }
  }

  OnSubmit(DataForm: any) {
    if (this.loginUserForm.valid) {
      let redirected = false;
      let isAdmin = false;

      // Vérifier si l'utilisateur est un administrateur
      this.admin.forEach((u) => {
        if (
          u.email1 == this.loginUserForm.value.email &&
          u.password1 == this.loginUserForm.value.password
        ) {
          this.router.navigate(['/adminn']);
          isAdmin = true;
          redirected = true;
          return;
        }
      });

      if (!isAdmin) {
        // Vérifier si l'utilisateur est un employé
        this.apiApp.logina(this.loginUserForm.value).subscribe(
          (response: any) => {
            console.log("Réponse du login de l'employeur:", response);

            if (response.status === 'success') {
              redirected = true;
              this.router.navigate(['/employer']);
            } else {
              // L'utilisateur n'est pas un employé, vérifier si c'est un utilisateur
              this.apiApp.login(this.loginUserForm.value).subscribe(
                (res: any) => {
                  console.log('cococ', res);
                  if (res.status == 'okok') {
                    console.log('cococ2', res.data.existUser);
                    const authId = res.data.existUser;
                    this.router.navigateByUrl('/acceuil', { state: authId });
                  } else {
                    $('#exampleModalCenter').modal('show');
                  }
                },
                (err) => {
                  if (err) {
                    console.log('we got in error');
                  }
                }
              );
            }
          },
          (error) => {
            console.error("Erreur lors du login de l'employeur:", error);
          }
        );
      }
    }
  }

  onHome() {
    this.router.navigate(['/home']);
  }
  onInsc() {
    this.router.navigate(['/sign-up']);
  }

  onRegister() {
    this.router.navigate(['/sign-up']);
  }
  ondebut() {
    this.router.navigate(['/debut']);
  }
  onabout() {
    this.router.navigate(['/aboutUS']);
  }
  onCloseButtonClick() {
    $('#exampleModalCenter').modal('hide');
  }
}
