import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfComunicacionComponent } from './inf-comunicacion.component';

describe('InfComunicacionComponent', () => {
  let component: InfComunicacionComponent;
  let fixture: ComponentFixture<InfComunicacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InfComunicacionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InfComunicacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
