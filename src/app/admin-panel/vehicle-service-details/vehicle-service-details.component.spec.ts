import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleServiceDetailsComponent } from './vehicle-service-details.component';

describe('VehicleServiceDetailsComponent', () => {
  let component: VehicleServiceDetailsComponent;
  let fixture: ComponentFixture<VehicleServiceDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VehicleServiceDetailsComponent]
    });
    fixture = TestBed.createComponent(VehicleServiceDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
