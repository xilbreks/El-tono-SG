import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpedienteItemCallsComponent } from './expediente-item-calls.component';

describe('ExpedienteItemCallsComponent', () => {
  let component: ExpedienteItemCallsComponent;
  let fixture: ComponentFixture<ExpedienteItemCallsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExpedienteItemCallsComponent]
    });
    fixture = TestBed.createComponent(ExpedienteItemCallsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
