import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpedienteItemSinoeComponent } from './expediente-item-sinoe.component';

describe('ExpedienteItemSinoeComponent', () => {
  let component: ExpedienteItemSinoeComponent;
  let fixture: ComponentFixture<ExpedienteItemSinoeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExpedienteItemSinoeComponent]
    });
    fixture = TestBed.createComponent(ExpedienteItemSinoeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
