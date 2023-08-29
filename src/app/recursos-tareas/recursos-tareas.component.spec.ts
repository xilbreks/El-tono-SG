import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecursosTareasComponent } from './recursos-tareas.component';

describe('RecursosTareasComponent', () => {
  let component: RecursosTareasComponent;
  let fixture: ComponentFixture<RecursosTareasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RecursosTareasComponent]
    });
    fixture = TestBed.createComponent(RecursosTareasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
