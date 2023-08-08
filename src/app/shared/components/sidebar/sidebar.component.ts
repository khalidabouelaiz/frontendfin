import { Component, OnInit } from '@angular/core';
import { ApiAppService } from 'src/app/Service/api-app.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  lotCounts: { nom: string; count: number }[] = [];
  employeurForm: FormGroup;
  nom: string;
  email: string;
  lotss: any[];
  constructor(
    public apiApp: ApiAppService,
    private http: HttpClient,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.nom = 'Administrateur';
    this.email = 'administrateur@hotmail.com';
    this.retrieveAllLots();
    this.createEmployeurForm();
  }

  createEmployeurForm() {
    this.employeurForm = this.formBuilder.group({
      nom: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }
  onSubmit() {
    if (this.employeurForm.invalid) {
      return;
    }

    const employeurData = this.employeurForm.value;
    // Appeler la méthode de service pour enregistrer l'employeur
    this.apiApp.registerEmployeur(employeurData).subscribe(
      (res) => {
        console.log('Employeur créé avec succès');
        // Réinitialiser le formulaire après la création réussie
        this.employeurForm.reset();
      },
      (error) => {
        console.log("Erreur lors de la création de l'employeur");
      }
    );
  }

  retrieveAllLots() {
    this.apiApp.getAllLotsUsed().subscribe(
      (res) => {
        this.lotss = res;
        console.log(this.lotss);
        this.calculateLotCounts();
      },
      (error) => {
        console.log("Erreur lors de la communication avec l'API");
      }
    );
  }
  calculateLotCounts() {
    this.lotCounts = [];

    for (let lot of this.lotss) {
      let existingLot = this.lotCounts.find((item) => item.nom === lot.nom);
      if (existingLot) {
        existingLot.count++;
      } else {
        this.lotCounts.push({ nom: lot.nom, count: 1 });
      }
    }
  }
  getLotCount(nom: string): number {
    let lotCount = this.lotCounts.find((item) => item.nom === nom);
    return lotCount ? lotCount.count : 0;
  }
}