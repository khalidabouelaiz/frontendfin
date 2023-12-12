import { Component, OnInit, ElementRef, HostListener } from '@angular/core';
import { Router, UrlTree, ActivatedRoute } from '@angular/router';
import { ApiAppService } from '../Service/api-app.service';
var nbr = document.forms.item;
declare var $: any;
@Component({
  selector: 'app-debut',
  templateUrl: './debut.component.html',
  styleUrls: ['./debut.component.css'],
})
export class DebutComponent implements OnInit {
  constructor(public router: Router, private el: ElementRef) {}
  @HostListener('document:click', ['$event'])
  closeNavbarOnOutsideClick(event: Event): void {
    const navbar = this.el.nativeElement.querySelector('.navbar-collapse.show');
    if (navbar && !navbar.contains(event.target as Node)) {
      navbar.classList.remove('show');
    }
  }
  authId: string;
  ngOnInit(): void {}

  onlogin() {
    this.router.navigate(['/login']);
  }
  infus: string = 'assets/cadeau/inf.jpg';
  troi: string = 'assets/cadeau/39.png';
  six: string = 'assets/cadeau/69.png';
  sign: string = 'assets/cadeau/signature.jpeg';
  det: string = 'assets/cadeau/detox.jpeg';
  couv: string = 'assets/cadeau/acceuilcli.jpeg';
  fem: string = 'assets/cadeau/homme.jpeg';
  hom: string = 'assets/cadeau/femme.jpeg';
  onLog() {
    this.router.navigate(['/login']);
  }
  onInsc() {
    this.router.navigate(['/sign-up']);
  }
  onabout() {
    this.router.navigate(['/aboutUS']);
  }
}
