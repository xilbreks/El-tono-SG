import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpItemInfEComponent } from './exp-item-inf-e.component';

describe('ExpItemInfEComponent', () => {
  let component: ExpItemInfEComponent;
  let fixture: ComponentFixture<ExpItemInfEComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ExpItemInfEComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ExpItemInfEComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
