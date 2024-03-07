import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpItemEditMatchComponent } from './exp-item-edit-match.component';

describe('ExpItemEditMatchComponent', () => {
  let component: ExpItemEditMatchComponent;
  let fixture: ComponentFixture<ExpItemEditMatchComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExpItemEditMatchComponent]
    });
    fixture = TestBed.createComponent(ExpItemEditMatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
