import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpItemCoverComponent } from './exp-item-cover.component';

describe('ExpItemCoverComponent', () => {
  let component: ExpItemCoverComponent;
  let fixture: ComponentFixture<ExpItemCoverComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExpItemCoverComponent]
    });
    fixture = TestBed.createComponent(ExpItemCoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
