import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpedienteItemObsComponent } from './expediente-item-obs.component';

describe('ExpedienteItemObsComponent', () => {
  let component: ExpedienteItemObsComponent;
  let fixture: ComponentFixture<ExpedienteItemObsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExpedienteItemObsComponent]
    });
    fixture = TestBed.createComponent(ExpedienteItemObsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
