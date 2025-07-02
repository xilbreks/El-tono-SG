import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpItemEconAbonComponent } from './exp-item-econ-abon.component';

describe('ExpItemEconAbonComponent', () => {
  let component: ExpItemEconAbonComponent;
  let fixture: ComponentFixture<ExpItemEconAbonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ExpItemEconAbonComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ExpItemEconAbonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
