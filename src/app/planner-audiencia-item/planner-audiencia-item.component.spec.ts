import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlannerAudienciaItemComponent } from './planner-audiencia-item.component';

describe('PlannerAudienciaItemComponent', () => {
  let component: PlannerAudienciaItemComponent;
  let fixture: ComponentFixture<PlannerAudienciaItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PlannerAudienciaItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlannerAudienciaItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
