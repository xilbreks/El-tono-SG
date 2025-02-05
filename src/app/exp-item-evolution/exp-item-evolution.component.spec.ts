import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpItemEvolutionComponent } from './exp-item-evolution.component';

describe('ExpItemEvolutionComponent', () => {
  let component: ExpItemEvolutionComponent;
  let fixture: ComponentFixture<ExpItemEvolutionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ExpItemEvolutionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ExpItemEvolutionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
