import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { response } from 'express';
import { ApiAppService } from '../Service/api-app.service';
//import { ElementRef }from '@angular/core' ;
import { Router } from '@angular/router';
declare var $: any;
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent implements OnInit {
  //@ViewChild('confirmPassword' , {static : false}) confirmPassword : ElementRef;
  genreValues = [
    { name: 'Homme', value: 'home' },
    { name: 'Femme', value: 'femme' },
    { name: 'Autre', value: 'autre' },
  ];
  UserRegistrationForm: FormGroup;
  constructor(public apiApp: ApiAppService, public router: Router) {
    this.UserRegistrationForm = new FormGroup({
      nom: new FormControl('', [Validators.required]),
      prenom: new FormControl('', [Validators.required]),
      genre: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.email, Validators.required]),
      telephone: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {}
  onSubmit(): void {
    if (this.UserRegistrationForm.valid) {
      console.log('User form  value is ', this.UserRegistrationForm.value);
      this.apiApp.registerUser(this.UserRegistrationForm.value).subscribe(
        (res) => {
          if (res) {
            this.router.navigate(['/login']);
          }
        },
        (err) => {
          if (err) {
            $('#exampleModalCenter').modal('show');
            console.log('we got in error');
          }
        }
      );
    }
  }
  ondebut() {
    this.router.navigate(['/debut']);
  }
  onLogin() {
    this.router.navigate(['/login']);
  }
  onregister() {
    this.router.navigate(['/sign-up']);
  }
  onAboutUS() {
    this.router.navigate(['/aboutUS']);
  }
  redemarrerPage() {
    window.location.reload();
  }
  onCloseButtonClick() {
    $('#exampleModalCenter').modal('hide');
  }
}
