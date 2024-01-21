import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpedientesUpdaterComponent } from './expedientes-updater.component';

describe('ExpedientesUpdaterComponent', () => {
  let component: ExpedientesUpdaterComponent;
  let fixture: ComponentFixture<ExpedientesUpdaterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExpedientesUpdaterComponent]
    });
    fixture = TestBed.createComponent(ExpedientesUpdaterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
