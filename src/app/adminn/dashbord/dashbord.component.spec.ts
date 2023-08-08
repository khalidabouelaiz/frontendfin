import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashbordComponent } from './dashbord.component';
import { ApiAppService } from '../../Service/api-app.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MailModalComponent } from '../../mail/mail.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';

describe('DashbordComponent', () => {
  let component: DashbordComponent;
  let fixture: ComponentFixture<DashbordComponent>;
  let apiAppService: ApiAppService;
  let modalService: NgbModal;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, BrowserAnimationsModule],
      declarations: [DashbordComponent],
      providers: [ApiAppService, NgbModal],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashbordComponent);
    component = fixture.componentInstance;
    apiAppService = TestBed.inject(ApiAppService);
    modalService = TestBed.inject(NgbModal);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
