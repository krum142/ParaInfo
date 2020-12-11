import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccessoryFormComponent } from './accessory-form.component';

describe('AccessoryFormComponent', () => {
  let component: AccessoryFormComponent;
  let fixture: ComponentFixture<AccessoryFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccessoryFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccessoryFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
