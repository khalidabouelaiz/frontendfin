import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { EmployerComponent } from './employer.component';
import { ApiAppService } from '../Service/api-app.service';

describe('EmployerComponent', () => {
  let component: EmployerComponent;
  let fixture: ComponentFixture<EmployerComponent>;
  let apiAppService: ApiAppService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [EmployerComponent],
      providers: [ApiAppService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployerComponent);
    component = fixture.componentInstance;
    apiAppService = TestBed.inject(ApiAppService);
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });
});
