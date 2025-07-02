import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpItemEconAranComponent } from './exp-item-econ-aran.component';

describe('ExpItemEconAranComponent', () => {
  let component: ExpItemEconAranComponent;
  let fixture: ComponentFixture<ExpItemEconAranComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ExpItemEconAranComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ExpItemEconAranComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
