import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpItemSinoeComponent } from './exp-item-sinoe.component';

describe('ExpItemSinoeComponent', () => {
  let component: ExpItemSinoeComponent;
  let fixture: ComponentFixture<ExpItemSinoeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ExpItemSinoeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ExpItemSinoeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
