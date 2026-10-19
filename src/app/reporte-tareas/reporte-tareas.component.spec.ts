import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteTareasComponent } from './reporte-tareas.component';

describe('ReporteTareasComponent', () => {
  let component: ReporteTareasComponent;
  let fixture: ComponentFixture<ReporteTareasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReporteTareasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReporteTareasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
