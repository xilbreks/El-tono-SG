import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpItemEditCodeComponent } from './exp-item-edit-code.component';

describe('ExpItemEditCodeComponent', () => {
  let component: ExpItemEditCodeComponent;
  let fixture: ComponentFixture<ExpItemEditCodeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExpItemEditCodeComponent]
    });
    fixture = TestBed.createComponent(ExpItemEditCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
