import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpedienteEditComponent } from './expediente-edit.component';

describe('ExpedienteEditComponent', () => {
  let component: ExpedienteEditComponent;
  let fixture: ComponentFixture<ExpedienteEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExpedienteEditComponent]
    });
    fixture = TestBed.createComponent(ExpedienteEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
