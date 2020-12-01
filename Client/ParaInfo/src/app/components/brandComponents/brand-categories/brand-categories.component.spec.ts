import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrandCategoriesComponent } from './brand-categories.component';

describe('BrandCategoriesComponent', () => {
  let component: BrandCategoriesComponent;
  let fixture: ComponentFixture<BrandCategoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BrandCategoriesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BrandCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
