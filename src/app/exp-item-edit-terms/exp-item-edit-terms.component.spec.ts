import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpItemEditTermsComponent } from './exp-item-edit-terms.component';

describe('ExpItemEditTermsComponent', () => {
  let component: ExpItemEditTermsComponent;
  let fixture: ComponentFixture<ExpItemEditTermsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExpItemEditTermsComponent]
    });
    fixture = TestBed.createComponent(ExpItemEditTermsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
