import { TestBed, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HomeClientComponent } from './home-client.component';
import { ApiAppService } from '../Service/api-app.service';

describe('HomeClientComponent', () => {
  let component: HomeClientComponent;
  let fixture: ComponentFixture<HomeClientComponent>;
  let apiAppServiceSpy: jasmine.SpyObj<ApiAppService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('ApiAppService', ['insertLot']);

    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [HomeClientComponent],
      providers: [{ provide: ApiAppService, useValue: spy }],
    });

    fixture = TestBed.createComponent(HomeClientComponent);
    component = fixture.componentInstance;
    apiAppServiceSpy = TestBed.inject(
      ApiAppService
    ) as jasmine.SpyObj<ApiAppService>;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });
});
