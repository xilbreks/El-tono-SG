import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlannerCitasComponent } from './planner-citas.component';

describe('PlannerCitasComponent', () => {
  let component: PlannerCitasComponent;
  let fixture: ComponentFixture<PlannerCitasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PlannerCitasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PlannerCitasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
