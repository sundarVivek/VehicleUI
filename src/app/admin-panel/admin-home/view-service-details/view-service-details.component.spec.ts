import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewServiceDetailsComponent } from './view-service-details.component';

describe('ViewServiceDetailsComponent', () => {
  let component: ViewServiceDetailsComponent;
  let fixture: ComponentFixture<ViewServiceDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewServiceDetailsComponent]
    });
    fixture = TestBed.createComponent(ViewServiceDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
