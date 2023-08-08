import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MailModalComponent } from './mail.component';

describe('MailModalComponent', () => {
  let component: MailModalComponent;
  let fixture: ComponentFixture<MailModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MailModalComponent],
      imports: [ReactiveFormsModule, HttpClientTestingModule],
      providers: [NgbActiveModal],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MailModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize myForm with empty values', () => {
    expect(component.myForm.get('sujet')?.value).toBe('');
    expect(component.myForm.get('message')?.value).toBe('');
  });

  it('should emit form value when submitting the form', () => {
    const formValue = {
      sujet: 'Test sujet',
      message: 'Test message',
    };

    spyOn(component.activeModal, 'close');

    component.myForm.setValue(formValue);
    component.submitForm();

    expect(component.activeModal.close).toHaveBeenCalledWith(formValue);
  });
});
