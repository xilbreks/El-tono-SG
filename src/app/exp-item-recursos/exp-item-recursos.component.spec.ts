import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpItemRecursosComponent } from './exp-item-recursos.component';

describe('ExpItemRecursosComponent', () => {
  let component: ExpItemRecursosComponent;
  let fixture: ComponentFixture<ExpItemRecursosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ExpItemRecursosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ExpItemRecursosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
