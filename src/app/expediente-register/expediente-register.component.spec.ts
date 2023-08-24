import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpedienteRegisterComponent } from './expediente-register.component';

describe('ExpedienteRegisterComponent', () => {
  let component: ExpedienteRegisterComponent;
  let fixture: ComponentFixture<ExpedienteRegisterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExpedienteRegisterComponent]
    });
    fixture = TestBed.createComponent(ExpedienteRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
