import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateParagliderComponent } from './create-paraglider.component';

describe('CreateParagliderComponent', () => {
  let component: CreateParagliderComponent;
  let fixture: ComponentFixture<CreateParagliderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateParagliderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateParagliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
