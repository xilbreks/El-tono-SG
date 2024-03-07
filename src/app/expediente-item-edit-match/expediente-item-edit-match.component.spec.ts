import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpedienteItemEditMatchComponent } from './expediente-item-edit-match.component';

describe('ExpedienteItemEditMatchComponent', () => {
  let component: ExpedienteItemEditMatchComponent;
  let fixture: ComponentFixture<ExpedienteItemEditMatchComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExpedienteItemEditMatchComponent]
    });
    fixture = TestBed.createComponent(ExpedienteItemEditMatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
