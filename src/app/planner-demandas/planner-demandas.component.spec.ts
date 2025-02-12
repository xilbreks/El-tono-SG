import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlannerDemandasComponent } from './planner-demandas.component';

describe('PlannerDemandasComponent', () => {
  let component: PlannerDemandasComponent;
  let fixture: ComponentFixture<PlannerDemandasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PlannerDemandasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PlannerDemandasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
