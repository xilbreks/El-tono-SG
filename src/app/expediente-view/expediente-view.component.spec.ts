import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpedienteViewComponent } from './expediente-view.component';

describe('ExpedienteViewComponent', () => {
  let component: ExpedienteViewComponent;
  let fixture: ComponentFixture<ExpedienteViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExpedienteViewComponent]
    });
    fixture = TestBed.createComponent(ExpedienteViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
