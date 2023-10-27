import { Component, OnInit, Inject } from '@angular/core';
import { Router, UrlTree, ActivatedRoute } from '@angular/router';
import { ApiAppService } from '../Service/api-app.service';
var un = 0;
var deux = 0;
var troix = 0;
var quatre = 0;
var cinq = 0;
var combien = 0;
var nbr = document.forms.item;
declare var $: any;
var u = 'tu as gagner  un infuseur à thé';
var u = 'tu as gagner  un infuseur à thé';
var u = 'tu as gagner  un infuseur à thé';
var u = 'tu as gagner  un infuseur à thé';
var u = 'tu as gagner  un infuseur à thé';
@Component({
  selector: 'app-home-client',
  templateUrl: './home-client.component.html',
  styleUrls: ['./home-client.component.css'],
})
export class HomeClientComponent implements OnInit {
  constructor(
    public router: Router,
    public apiApp: ApiAppService,
    @Inject(ActivatedRoute) private activatedroute: ActivatedRoute
  ) {}
  blance: string = 'assets/cadeau/blanche.png';
  rouge: string = 'assets/cadeau/rouge.png';
  noir: string = 'assets/cadeau/noire.png';
  gold: string = 'assets/cadeau/gold.png';
  mauve: string = 'assets/cadeau/mauve.png';
  play: string = 'assets/cadeau/play.jpeg';
  infus: string = 'assets/cadeau/inf.jpg';
  troi: string = 'assets/cadeau/39.png';
  six: string = 'assets/cadeau/69.png';
  sign: string = 'assets/cadeau/signature.jpeg';
  det: string = 'assets/cadeau/detox.jpeg';
  felici: string = 'assets/cadeau/felici.jpeg';
  term: string = 'assets/cadeau/term.png';

  ngOnInit(): void {}
  getUrl() {
    return "url('assets/cadeau/play.jpeg')";
  }




  onhome() {
    $('#exampleModalCenter').modal('hide');
    $('#exampleModalCenter1').modal('hide');
    $('#exampleModalCenter2').modal('hide');
    $('#exampleModalCenter3').modal('hide');
    $('#exampleModalCenter4').modal('hide');
    $('#exampleModalCenter5').modal('hide');
    this.router.navigate(['/login']);
  }

  myFunc() {
    var randNumber = Math.random() * 5;
    console.log('nombre' + randNumber);
    console.log('total click' + combien);
    if (50 > combien) {
      if (0 < randNumber && randNumber <= 1) {
        if (30 <= un) {
          this.myFunc();
          return;
        } else {
          un = un + 1;
          combien = combien + 1;

          console.log('nombre de ' + un + 'num 1');

          $('#exampleModalCenter').modal('show');

          const tid = this.activatedroute.snapshot.paramMap.get('tid');
          const uid = this.activatedroute.snapshot.paramMap.get('uid');

          console.log('tid', tid);

          const data = {
            tid: tid,
            uid: uid,
            nom: 'infuseur a the',
            description: 'desc',
            ref_participation: 'refff',
            reception: 'rec',
          };

          this.apiApp.insertLot(data).subscribe(
            (res: any) => {
              console.log('resultaaaaats', res.data);
            },
            (err) => {
              if (err) {
                console.log('we got in error');
              }
            }
          );
        }
      }
      if (1 < randNumber && randNumber <= 2) {
        if (10 <= deux) {
          this.myFunc();
          return;
        } else {
          deux = deux + 1;
          combien = combien + 1;
          console.log('nombre de ' + deux + ' num  2');

          $('#exampleModalCenter1').modal('show');

          const tid = this.activatedroute.snapshot.paramMap.get('tid');
          const uid = this.activatedroute.snapshot.paramMap.get('uid');

          console.log('tid', tid);

          const data = {
            tid: tid,
            uid: uid,
            nom: 'boite de 100g d’un thé détox ou d’infusion',
            description: 'desc',
            ref_participation: 'refff',
            reception: 'rec',
          };

          this.apiApp.insertLot(data).subscribe(
            (res: any) => {
              console.log('resultaaaaats', res.data);
            },
            (err) => {
              if (err) {
                console.log('we got in error');
              }
            }
          );
        }
      }
      if (2 < randNumber && randNumber <= 3) {
        if (5 <= troix) {
          this.myFunc();
          return;
        } else {
          troix = troix + 1;
          combien = combien + 1;
          console.log('nombre de ' + troix + ' num 3');

          $('#exampleModalCenter2').modal('show');
          const tid = this.activatedroute.snapshot.paramMap.get('tid');
          const uid = this.activatedroute.snapshot.paramMap.get('uid');

          console.log('tid', tid);

          const data = {
            tid: tid,
            uid: uid,
            nom: 'boite de 100g d’un thé signature',
            description: 'desc',
            ref_participation: 'refff',
            reception: 'rec',
          };

          this.apiApp.insertLot(data).subscribe(
            (res: any) => {
              console.log('resultaaaaats', res.data);
            },
            (err) => {
              if (err) {
                console.log('we got in error');
              }
            }
          );
        }
      }
      if (3 < randNumber && randNumber <= 4) {
        if (3 <= quatre) {
          this.myFunc();
          return;
        } else {
          quatre = quatre + 1;
          combien = combien + 1;
          console.log('nombre de ' + quatre + ' num 4');

          $('#exampleModalCenter3').modal('show');
          const tid = this.activatedroute.snapshot.paramMap.get('tid');
          const uid = this.activatedroute.snapshot.paramMap.get('uid');

          console.log('tid', tid);

          const data = {
            tid: tid,
            uid: uid,
            nom: 'coffret découverte d’une valeur de 39€',
            description: 'desc',
            ref_participation: 'refff',
            reception: 'rec',
          };

          this.apiApp.insertLot(data).subscribe(
            (res: any) => {
              console.log('resultaaaaats', res.data);
            },
            (err) => {
              if (err) {
                console.log('we got in error');
              }
            }
          );
        }
      }
      if (4 < randNumber && randNumber <= 5) {
        if (2 <= cinq) {
          this.myFunc();
          return;
        } else {
          cinq = cinq + 1;
          combien = combien + 1;
          console.log('nombre de ' + cinq + ' num 5');

          $('#exampleModalCenter4').modal('show');
          const tid = this.activatedroute.snapshot.paramMap.get('tid');
          const uid = this.activatedroute.snapshot.paramMap.get('uid');

          console.log('tid', tid);

          const data = {
            tid: tid,
            uid: uid,
            nom: 'coffret découverte d’une valeur de 69€',
            description: 'desc',
            ref_participation: 'refff',
            reception: 'rec',
          };

          this.apiApp.insertLot(data).subscribe(
            (res: any) => {
              console.log('resultaaaaats', res.data);
            },
            (err) => {
              if (err) {
                console.log('we got in error');
              }
            }
          );
        }
      }
    } else {
      console.log('le jeux a terminer ');
      $('#exampleModalCenter5').modal('show');
    }
  }
  fu() {
    console.log('dkhl');
    return this.myFunc;
  }
}
