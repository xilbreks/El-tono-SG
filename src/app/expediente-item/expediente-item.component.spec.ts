import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpedienteItemComponent } from './expediente-item.component';

describe('ExpedienteItemComponent', () => {
  let component: ExpedienteItemComponent;
  let fixture: ComponentFixture<ExpedienteItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExpedienteItemComponent]
    });
    fixture = TestBed.createComponent(ExpedienteItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
