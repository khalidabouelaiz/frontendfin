import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { DebutComponent } from './debut.component';

describe('DebutComponent', () => {
  let component: DebutComponent;
  let fixture: ComponentFixture<DebutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [DebutComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DebutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should display the navigation links', () => {
    const links = fixture.nativeElement.querySelectorAll('nav ul li a');
    expect(links.length).toBe(3);
    expect(links[0].textContent).toContain('Se connecter');
    expect(links[1].textContent).toContain('Inscription');
    expect(links[2].textContent).toContain('A propos');
  });

  it('should navigate to signup page when "Inscription" link is clicked', () => {
    spyOn(component, 'onInsc');
    const inscriptionLink = fixture.nativeElement.querySelector(
      'nav ul li:nth-child(2) a'
    );
    inscriptionLink.click();
    expect(component.onInsc).toHaveBeenCalled();
  });
});
