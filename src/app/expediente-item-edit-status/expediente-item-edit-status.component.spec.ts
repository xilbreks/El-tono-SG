import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpedienteItemEditStatusComponent } from './expediente-item-edit-status.component';

describe('ExpedienteItemEditStatusComponent', () => {
  let component: ExpedienteItemEditStatusComponent;
  let fixture: ComponentFixture<ExpedienteItemEditStatusComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExpedienteItemEditStatusComponent]
    });
    fixture = TestBed.createComponent(ExpedienteItemEditStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
