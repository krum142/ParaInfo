import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MostViewedParaglidersComponent } from './most-viewed-paragliders.component';

describe('MostViewedParaglidersComponent', () => {
  let component: MostViewedParaglidersComponent;
  let fixture: ComponentFixture<MostViewedParaglidersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MostViewedParaglidersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MostViewedParaglidersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
