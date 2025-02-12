import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlannerAudienciasComponent } from './planner-audiencias.component';

describe('PlannerAudienciasComponent', () => {
  let component: PlannerAudienciasComponent;
  let fixture: ComponentFixture<PlannerAudienciasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PlannerAudienciasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PlannerAudienciasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
