import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpItemEditDataComponent } from './exp-item-edit-data.component';

describe('ExpItemEditDataComponent', () => {
  let component: ExpItemEditDataComponent;
  let fixture: ComponentFixture<ExpItemEditDataComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExpItemEditDataComponent]
    });
    fixture = TestBed.createComponent(ExpItemEditDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
