import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HarnessDetailsComponent } from './harness-details.component';

describe('HarnessDetailsComponent', () => {
  let component: HarnessDetailsComponent;
  let fixture: ComponentFixture<HarnessDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HarnessDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HarnessDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
