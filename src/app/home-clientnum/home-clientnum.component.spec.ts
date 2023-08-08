import { TestBed, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HomeClientnumComponent } from './home-clientnum.component';
import { of } from 'rxjs';
import { NgForm } from '@angular/forms';

describe('HomeClientnumComponent', () => {
  let component: HomeClientnumComponent;
  let fixture: ComponentFixture<HomeClientnumComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule, FormsModule],
      declarations: [HomeClientnumComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeClientnumComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should display the title', () => {
    const titleElement: HTMLElement =
      fixture.nativeElement.querySelector('title');
    expect(titleElement.textContent).toContain('the tip top');
  });

  it('should display the description', () => {
    const descriptionElement: HTMLElement = fixture.nativeElement.querySelector(
      'meta[name="description"]'
    );
    expect(descriptionElement.getAttribute('content')).toBe(
      'Participez à notre jeu de concours de thé pour gagner des cadeaux incroyables.'
    );
  });

  it('should navigate to login page on deco()', () => {
    spyOn(router, 'navigate');

    component.deco();

    expect(router.navigate).toHaveBeenCalledWith(['/login']);
  });

  it('should submit the form and navigate to homeclient page on valid input', () => {
    const ticket = '12345678900';
    const form = {
      value: { numero: ticket },
    };

    spyOn(component.apiApp, 'verifyTicket').and.returnValue(
      of({ status: 'ok', data: ticket })
    );

    spyOn(router, 'navigate');

    component.onSubmit(<NgForm>(<unknown>form));

    expect(component.apiApp.verifyTicket).toHaveBeenCalledWith({
      numero: ticket,
      uid: null,
    });
    expect(router.navigate).toHaveBeenCalledWith(['/homeclient', ticket]);
  });
});
