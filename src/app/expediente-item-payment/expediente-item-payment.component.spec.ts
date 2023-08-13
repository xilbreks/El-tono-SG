import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpedienteItemPaymentComponent } from './expediente-item-payment.component';

describe('ExpedienteItemPaymentComponent', () => {
  let component: ExpedienteItemPaymentComponent;
  let fixture: ComponentFixture<ExpedienteItemPaymentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExpedienteItemPaymentComponent]
    });
    fixture = TestBed.createComponent(ExpedienteItemPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
