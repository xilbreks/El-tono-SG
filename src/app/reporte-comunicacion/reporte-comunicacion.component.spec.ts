import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteComunicacionComponent } from './reporte-comunicacion.component';

describe('ReporteComunicacionComponent', () => {
  let component: ReporteComunicacionComponent;
  let fixture: ComponentFixture<ReporteComunicacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReporteComunicacionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReporteComunicacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
