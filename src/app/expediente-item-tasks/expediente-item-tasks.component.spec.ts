import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpedienteItemTasksComponent } from './expediente-item-tasks.component';

describe('ExpedienteItemTasksComponent', () => {
  let component: ExpedienteItemTasksComponent;
  let fixture: ComponentFixture<ExpedienteItemTasksComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExpedienteItemTasksComponent]
    });
    fixture = TestBed.createComponent(ExpedienteItemTasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
