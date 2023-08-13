import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpedienteItemCoverComponent } from './expediente-item-cover.component';

describe('ExpedienteItemCoverComponent', () => {
  let component: ExpedienteItemCoverComponent;
  let fixture: ComponentFixture<ExpedienteItemCoverComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExpedienteItemCoverComponent]
    });
    fixture = TestBed.createComponent(ExpedienteItemCoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
