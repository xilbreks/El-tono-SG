import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpItemCallsComponent } from './exp-item-calls.component';

describe('ExpItemCallsComponent', () => {
  let component: ExpItemCallsComponent;
  let fixture: ComponentFixture<ExpItemCallsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ExpItemCallsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ExpItemCallsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
