import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResolucionesWorkerComponent } from './resoluciones-worker.component';

describe('ResolucionesWorkerComponent', () => {
  let component: ResolucionesWorkerComponent;
  let fixture: ComponentFixture<ResolucionesWorkerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ResolucionesWorkerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ResolucionesWorkerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
