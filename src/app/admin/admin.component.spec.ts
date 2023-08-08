import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AdminComponent } from './admin.component';

describe('AdminComponent', () => {
  let component: AdminComponent;
  let fixture: ComponentFixture<AdminComponent>;
  let activeModal: NgbActiveModal;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminComponent],
      providers: [NgbActiveModal],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminComponent);
    component = fixture.componentInstance;
    activeModal = TestBed.inject(NgbActiveModal);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should close the modal with false value on clicking "NON" button', () => {
    const closeSpy = spyOn(activeModal, 'close');

    const nonButton = fixture.nativeElement.querySelector(
      '.modal-footer button:first-child'
    );
    nonButton.click();

    expect(closeSpy).toHaveBeenCalledWith(false);
  });

  it('should close the modal with true value on clicking "OUI" button', () => {
    const closeSpy = spyOn(activeModal, 'close');

    const ouiButton = fixture.nativeElement.querySelector(
      '.modal-footer button:last-child'
    );
    ouiButton.click();

    expect(closeSpy).toHaveBeenCalledWith(true);
  });
});
