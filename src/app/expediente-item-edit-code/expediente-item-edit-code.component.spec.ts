import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpedienteItemEditCodeComponent } from './expediente-item-edit-code.component';

describe('ExpedienteItemEditCodeComponent', () => {
  let component: ExpedienteItemEditCodeComponent;
  let fixture: ComponentFixture<ExpedienteItemEditCodeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExpedienteItemEditCodeComponent]
    });
    fixture = TestBed.createComponent(ExpedienteItemEditCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
