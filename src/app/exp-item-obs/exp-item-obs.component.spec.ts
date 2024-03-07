import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpItemObsComponent } from './exp-item-obs.component';

describe('ExpItemObsComponent', () => {
  let component: ExpItemObsComponent;
  let fixture: ComponentFixture<ExpItemObsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExpItemObsComponent]
    });
    fixture = TestBed.createComponent(ExpItemObsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
