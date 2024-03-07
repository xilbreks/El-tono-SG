import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpItemEditStatusComponent } from './exp-item-edit-status.component';

describe('ExpItemEditStatusComponent', () => {
  let component: ExpItemEditStatusComponent;
  let fixture: ComponentFixture<ExpItemEditStatusComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExpItemEditStatusComponent]
    });
    fixture = TestBed.createComponent(ExpItemEditStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
