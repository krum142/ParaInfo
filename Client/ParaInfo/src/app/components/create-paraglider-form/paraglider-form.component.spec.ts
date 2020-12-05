import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParagliderFormComponent } from './paraglider-form.component';

describe('ParagliderFormComponent', () => {
  let component: ParagliderFormComponent;
  let fixture: ComponentFixture<ParagliderFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParagliderFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ParagliderFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
