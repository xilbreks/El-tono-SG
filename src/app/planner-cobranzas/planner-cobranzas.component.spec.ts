import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlannerCobranzasComponent } from './planner-cobranzas.component';

describe('PlannerCobranzasComponent', () => {
  let component: PlannerCobranzasComponent;
  let fixture: ComponentFixture<PlannerCobranzasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PlannerCobranzasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PlannerCobranzasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
