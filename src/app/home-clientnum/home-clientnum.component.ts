import { Component, OnInit, NgZone, Inject } from '@angular/core';
import { FormGroup, FormsModule, NgForm } from '@angular/forms';
import { Router, UrlTree, ActivatedRoute } from '@angular/router';
import { User } from '@auth0/auth0-angular';
import { HttpClient } from '@angular/common/http';

import { takeUntil } from 'rxjs/operators';
import { ApiAppService } from '../Service/api-app.service';
import { Subject } from 'rxjs';
var araa = 1234567890;
declare var $: any;
@Component({
  selector: 'app-home-clientnum',
  templateUrl: './home-clientnum.component.html',
  styleUrls: ['./home-clientnum.component.css'],
})
export class HomeClientnumComponent implements OnInit {
  constructor(
    private http: HttpClient,
    public router: Router,
    public apiApp: ApiAppService,
    private zone: NgZone,
    @Inject(ActivatedRoute) private activatedroute: ActivatedRoute
  ) {
    console.log(
      'activateroute',
      this.activatedroute.snapshot.paramMap.get('_id')
    );
  }
  bonnec: string = 'assets/cadeau/bonnec.jpeg';

  registeNUM: FormGroup;

  ngOnInit(): void {}
  deco() {
    this.router.navigate(['/login']);
  }
  onCloseButtonClick() {
    $('#exampleModalCenter').modal('hide');
  }

  onSubmit(form: NgForm) {
    const uid = this.activatedroute.snapshot.paramMap.get('_id');
    const data = {
      numero: form.value.numero,
      uid: uid,
    };
    this.apiApp.verifyTicket(data).subscribe(
      (res: any) => {
        console.log('resultaaaaats', res.data);
        if (res.status == 'ok') {
          const ticket = res.data;
          this.router.navigate(['/homeclient', ticket]);
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
}
