import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResolucionesAdminComponent } from './resoluciones-admin.component';

describe('ResolucionesAdminComponent', () => {
  let component: ResolucionesAdminComponent;
  let fixture: ComponentFixture<ResolucionesAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ResolucionesAdminComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ResolucionesAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
