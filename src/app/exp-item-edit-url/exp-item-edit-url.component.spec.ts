import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpItemEditUrlComponent } from './exp-item-edit-url.component';

describe('ExpItemEditUrlComponent', () => {
  let component: ExpItemEditUrlComponent;
  let fixture: ComponentFixture<ExpItemEditUrlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExpItemEditUrlComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ExpItemEditUrlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
