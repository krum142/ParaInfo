import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParagliderDetailsComponent } from './paraglider-details.component';

describe('ParagliderDetailsComponent', () => {
  let component: ParagliderDetailsComponent;
  let fixture: ComponentFixture<ParagliderDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParagliderDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ParagliderDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
