import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpItemEconCuotComponent } from './exp-item-econ-cuot.component';

describe('ExpItemEconCuotComponent', () => {
  let component: ExpItemEconCuotComponent;
  let fixture: ComponentFixture<ExpItemEconCuotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ExpItemEconCuotComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ExpItemEconCuotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
