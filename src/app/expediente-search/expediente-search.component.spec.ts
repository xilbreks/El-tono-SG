import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpedienteSearchComponent } from './expediente-search.component';

describe('ExpedienteSearchComponent', () => {
  let component: ExpedienteSearchComponent;
  let fixture: ComponentFixture<ExpedienteSearchComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExpedienteSearchComponent]
    });
    fixture = TestBed.createComponent(ExpedienteSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
