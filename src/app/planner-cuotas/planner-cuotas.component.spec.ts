import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlannerCuotasComponent } from './planner-cuotas.component';

describe('PlannerCuotasComponent', () => {
  let component: PlannerCuotasComponent;
  let fixture: ComponentFixture<PlannerCuotasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PlannerCuotasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PlannerCuotasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
