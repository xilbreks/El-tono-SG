import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpedientesListInactiveComponent } from './expedientes-list-inactive.component';

describe('ExpedientesListInactiveComponent', () => {
  let component: ExpedientesListInactiveComponent;
  let fixture: ComponentFixture<ExpedientesListInactiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ExpedientesListInactiveComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ExpedientesListInactiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
