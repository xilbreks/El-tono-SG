import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpedienteItemClientComponent } from './expediente-item-client.component';

describe('ExpedienteItemClientComponent', () => {
  let component: ExpedienteItemClientComponent;
  let fixture: ComponentFixture<ExpedienteItemClientComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExpedienteItemClientComponent]
    });
    fixture = TestBed.createComponent(ExpedienteItemClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
