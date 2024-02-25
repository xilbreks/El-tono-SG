import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpedienteItemEditComponent } from './expediente-item-edit.component';

describe('ExpedienteItemEditComponent', () => {
  let component: ExpedienteItemEditComponent;
  let fixture: ComponentFixture<ExpedienteItemEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExpedienteItemEditComponent]
    });
    fixture = TestBed.createComponent(ExpedienteItemEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
