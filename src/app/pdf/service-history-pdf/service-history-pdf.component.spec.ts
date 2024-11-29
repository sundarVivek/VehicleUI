import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceHistoryPdfComponent } from './service-history-pdf.component';

describe('ServiceHistoryPdfComponent', () => {
  let component: ServiceHistoryPdfComponent;
  let fixture: ComponentFixture<ServiceHistoryPdfComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ServiceHistoryPdfComponent]
    });
    fixture = TestBed.createComponent(ServiceHistoryPdfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
