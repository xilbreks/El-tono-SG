import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpItemFeesComponent } from './exp-item-fees.component';

describe('ExpItemFeesComponent', () => {
  let component: ExpItemFeesComponent;
  let fixture: ComponentFixture<ExpItemFeesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExpItemFeesComponent]
    });
    fixture = TestBed.createComponent(ExpItemFeesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
