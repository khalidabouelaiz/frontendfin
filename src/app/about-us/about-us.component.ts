import { Component, OnInit, ElementRef, HostListener } from '@angular/core';
import { RouteConfigLoadEnd } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css'],
})
export class AboutUsComponent implements OnInit {
  constructor(public router: Router, private el: ElementRef) {}
  @HostListener('document:click', ['$event'])
  closeNavbarOnOutsideClick(event: Event): void {
    const navbar = this.el.nativeElement.querySelector('.navbar-collapse.show');
    if (navbar && !navbar.contains(event.target as Node)) {
      navbar.classList.remove('show');
    }
  }
  ngOnInit(): void {}
  onLogin() {
    this.router.navigate(['/login']);
  }
  ondebut() {
    this.router.navigate(['/debut']);
  }
  onRegister() {
    this.router.navigate(['/sign-up']);
  }
}
