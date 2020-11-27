import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateGliderComponent } from './create-glider.component';

describe('CreateGliderComponent', () => {
  let component: CreateGliderComponent;
  let fixture: ComponentFixture<CreateGliderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateGliderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateGliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
