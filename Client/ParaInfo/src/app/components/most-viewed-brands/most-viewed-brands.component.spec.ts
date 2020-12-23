import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MostViewedBrandsComponent } from './most-viewed-brands.component';

describe('MostViewedBrandsComponent', () => {
  let component: MostViewedBrandsComponent;
  let fixture: ComponentFixture<MostViewedBrandsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MostViewedBrandsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MostViewedBrandsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
