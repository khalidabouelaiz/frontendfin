import { Component, OnInit, Inject, NgZone } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiAppService } from '../Service/api-app.service';
import { HttpClient } from '@angular/common/http';
import { Location } from '@angular/common';

@Component({
  selector: 'app-acceuil',
  templateUrl: './acceuil.component.html',
  styleUrls: ['./acceuil.component.css'],
})
export class AcceuilComponent implements OnInit {
  lotNames: string[] = [];
  autreVariable: string[] = [];

  users: any[] = [];
  userId: string;
  userName: string;

  lot: any;

  constructor(
    private http: HttpClient,
    public router: Router,
    public apiApp: ApiAppService,
    private zone: NgZone,
    private location: Location,
    @Inject(ActivatedRoute) private activatedroute: ActivatedRoute
  ) {
    console.log(
      'activateroute',
      this.activatedroute.snapshot.paramMap.get('_id')
    );
  }

  ngOnInit(): void {
    const uid: any = this.location.getState();
    console.log('ha howa ', uid);

    this.userName = uid.nom;
    this.userId = uid.idLot;
    const userId: string = uid.idLot;

    this.retrieveUserLots(userId);
  }
  retrieveUserLots(userId: string): void {
    this.apiApp.getLotByIdUser(userId).subscribe({
      next: (data) => {
        const lotsData: any[] = data;
        const lotNames: string[] = lotsData.map((lot) => lot.nom);

        console.log("Noms des lots de l'utilisateur:", lotNames);
        this.autreVariable = [...lotNames];
        // Vous pouvez maintenant utiliser les lots de l'utilisateur spécifié
      },
      error: (e) => console.error(e),
    });
  }

  onSubmit() {
    const uid = this.location.getState();
    this.router.navigate(['/homeclientnum', uid]);
  }

  onhome() {
    this.router.navigate(['/login']);
  }
}
