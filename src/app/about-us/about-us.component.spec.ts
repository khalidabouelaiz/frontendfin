import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { AboutUsComponent } from './about-us.component';

describe('AboutUsComponent', () => {
  let component: AboutUsComponent;
  let fixture: ComponentFixture<AboutUsComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AboutUsComponent],
      imports: [RouterTestingModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutUsComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to login page on onLogin()', () => {
    spyOn(router, 'navigate');

    component.onLogin();

    expect(router.navigate).toHaveBeenCalledWith(['/login']);
  });

  it('should navigate to debut page on ondebut()', () => {
    spyOn(router, 'navigate');

    component.ondebut();

    expect(router.navigate).toHaveBeenCalledWith(['/debut']);
  });
});
