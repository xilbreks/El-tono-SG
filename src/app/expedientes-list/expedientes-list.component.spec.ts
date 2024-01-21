import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpedientesListComponent } from './expedientes-list.component';

describe('ExpedientesListComponent', () => {
  let component: ExpedientesListComponent;
  let fixture: ComponentFixture<ExpedientesListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExpedientesListComponent]
    });
    fixture = TestBed.createComponent(ExpedientesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
