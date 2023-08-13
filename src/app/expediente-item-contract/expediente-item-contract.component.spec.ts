import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpedienteItemContractComponent } from './expediente-item-contract.component';

describe('ExpedienteItemContractComponent', () => {
  let component: ExpedienteItemContractComponent;
  let fixture: ComponentFixture<ExpedienteItemContractComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExpedienteItemContractComponent]
    });
    fixture = TestBed.createComponent(ExpedienteItemContractComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
