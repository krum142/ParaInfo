import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadBrandProductsComponent } from './load-brand-products.component';

describe('LoadBrandProductsComponent', () => {
  let component: LoadBrandProductsComponent;
  let fixture: ComponentFixture<LoadBrandProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoadBrandProductsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadBrandProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
