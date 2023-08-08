import { Component, Input } from '@angular/core';
import { FormGroup, FormBuilder} from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiAppService } from './../Service/api-app.service';

@Component({
  selector: 'app-mail',
  templateUrl: './mail.component.html',
  styleUrls: ['./mail.component.css']
})
export class MailModalComponent {
  @Input()id: number;
  myForm: FormGroup;
  constructor(
   public activeModal: NgbActiveModal,
   private formBuilder: FormBuilder,
   public apiApp: ApiAppService,
  ) {
    this.createForm();
  }
  createForm() {
    this.myForm = this.formBuilder.group({
      sujet: '',
      message: ''
    });
  }
  submitForm() {
    this.activeModal.close(this.myForm.value);
  }
}
