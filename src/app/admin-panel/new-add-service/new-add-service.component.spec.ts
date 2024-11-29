import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewAddServiceComponent } from './new-add-service.component';

describe('NewAddServiceComponent', () => {
  let component: NewAddServiceComponent;
  let fixture: ComponentFixture<NewAddServiceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewAddServiceComponent]
    });
    fixture = TestBed.createComponent(NewAddServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
