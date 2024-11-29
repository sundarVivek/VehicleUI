import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DerviceSuccessComponent } from './dervice-success.component';

describe('DerviceSuccessComponent', () => {
  let component: DerviceSuccessComponent;
  let fixture: ComponentFixture<DerviceSuccessComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DerviceSuccessComponent]
    });
    fixture = TestBed.createComponent(DerviceSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
