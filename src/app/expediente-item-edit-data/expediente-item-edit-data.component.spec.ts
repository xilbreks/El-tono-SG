import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpedienteItemEditDataComponent } from './expediente-item-edit-data.component';

describe('ExpedienteItemEditDataComponent', () => {
  let component: ExpedienteItemEditDataComponent;
  let fixture: ComponentFixture<ExpedienteItemEditDataComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExpedienteItemEditDataComponent]
    });
    fixture = TestBed.createComponent(ExpedienteItemEditDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
