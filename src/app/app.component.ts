import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'PFE';
  constructor(public router: Router) {}
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
