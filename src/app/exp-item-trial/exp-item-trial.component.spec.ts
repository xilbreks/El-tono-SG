import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpItemTrialComponent } from './exp-item-trial.component';

describe('ExpItemTrialComponent', () => {
  let component: ExpItemTrialComponent;
  let fixture: ComponentFixture<ExpItemTrialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ExpItemTrialComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ExpItemTrialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
