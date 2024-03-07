import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpItemComponent } from './exp-item.component';

describe('ExpItemComponent', () => {
  let component: ExpItemComponent;
  let fixture: ComponentFixture<ExpItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExpItemComponent]
    });
    fixture = TestBed.createComponent(ExpItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
