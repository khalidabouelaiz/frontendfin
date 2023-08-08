import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCreationemployerComponent } from './create-creationemployer.component';

describe('CreateCreationemployerComponent', () => {
  let component: CreateCreationemployerComponent;
  let fixture: ComponentFixture<CreateCreationemployerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateCreationemployerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateCreationemployerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
