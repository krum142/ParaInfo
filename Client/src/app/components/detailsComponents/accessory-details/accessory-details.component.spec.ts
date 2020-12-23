import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccessoryDetailsComponent } from './accessory-details.component';

describe('AccessoryDetailsComponent', () => {
  let component: AccessoryDetailsComponent;
  let fixture: ComponentFixture<AccessoryDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccessoryDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccessoryDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
