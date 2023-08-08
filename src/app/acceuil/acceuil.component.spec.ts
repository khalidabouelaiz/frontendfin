import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing'; // Importez HttpClientTestingModule
import { AcceuilComponent } from './acceuil.component';
import { ApiAppService } from '../Service/api-app.service';

describe('AcceuilComponent', () => {
  let component: AcceuilComponent;
  let fixture: ComponentFixture<AcceuilComponent>;
  let router: Router;
  let location: Location;
  let activatedRoute: ActivatedRoute;
  let apiAppService: ApiAppService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AcceuilComponent],
      imports: [RouterTestingModule, HttpClientTestingModule], // Ajoutez HttpClientTestingModule
      providers: [ApiAppService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AcceuilComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    location = TestBed.inject(Location);
    activatedRoute = TestBed.inject(ActivatedRoute);
    apiAppService = TestBed.inject(ApiAppService);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to login page on onhome()', () => {
    const navigateSpy = spyOn(router, 'navigate');

    component.onhome();

    expect(navigateSpy).toHaveBeenCalledWith(['/login']);
  });
});
