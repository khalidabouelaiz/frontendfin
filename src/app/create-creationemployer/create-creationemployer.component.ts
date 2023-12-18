import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiAppService } from 'src/app/Service/api-app.service';

@Component({
  selector: 'app-create-creationemployer',
  templateUrl: './create-creationemployer.component.html',
  styleUrls: ['./create-creationemployer.component.css'],
})
export class CreateCreationemployerComponent implements OnInit {
  employeurForm: FormGroup;
  statusMessage: string | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private apiApp: ApiAppService
  ) {}

  ngOnInit(): void {
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
        this.statusMessage = 'Employeur créé avec succès!';
        // Réinitialiser le formulaire après la création réussie
        this.employeurForm.reset();
      },
      (error) => {
        console.log("Erreur lors de la création de l'employeur");
        this.statusMessage = "Erreur lors de la création de l'employeur";
      }
    );
  }
}
