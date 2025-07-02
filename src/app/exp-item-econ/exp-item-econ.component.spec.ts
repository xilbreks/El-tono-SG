import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpItemEconComponent } from './exp-item-econ.component';

describe('ExpItemEconComponent', () => {
  let component: ExpItemEconComponent;
  let fixture: ComponentFixture<ExpItemEconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ExpItemEconComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ExpItemEconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
