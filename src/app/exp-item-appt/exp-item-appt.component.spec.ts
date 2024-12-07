import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpItemApptComponent } from './exp-item-appt.component';

describe('ExpItemApptComponent', () => {
  let component: ExpItemApptComponent;
  let fixture: ComponentFixture<ExpItemApptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ExpItemApptComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ExpItemApptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
