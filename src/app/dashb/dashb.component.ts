import { Component, OnInit } from '@angular/core';
//import { Router } from 'express';
import { ApiAppService } from '../Service/api-app.service';
import { Router } from '@angular/router';
declare var google: any;

@Component({
  selector: 'app-dashb',
  templateUrl: './dashb.component.html',
  styleUrls: ['./dashb.component.css'],
})
export class DashbComponent implements OnInit {
  constructor(public apiApp: ApiAppService, public router: Router) {}

  handleCredentialResponse(response: any) {
    console.log('Encoded JWT ID token: ' + response.credential);
  }
  ngOnInit(): void {
    google.accounts.id.initialize({
      client_id: 'your_client_id',
      callback: this.handleCredentialResponse,
    });
    google.accounts.id.renderButton(
      document.getElementById('buttonDiv'),
      { theme: 'outline', size: 'large' } // customization attributes
    );
    google.accounts.id.prompt(); // also display the One Tap dialog
    if (localStorage.getItem('token')) {
      this.apiApp.toDashboard(localStorage.getItem('token')).subscribe(
        (res: any) => {
          if (res && res['status'] === 'ok') {
            console.log('we are in dashboard');
          } else {
            console.log('il ya une erreur');
          }
        },
        (err) => {
          if (err) {
            console.log('we got in error');
          }
        }
      );
    }
  }
  onLogout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
  onHome() {
    this.router.navigate(['/home']);
  }
  onLogin() {
    this.router.navigate(['/login']);
  }
  onRegister() {
    this.router.navigate(['/sign-up']);
  }
  onAboutUS() {
    this.router.navigate(['/aboutUS']);
  }
}
