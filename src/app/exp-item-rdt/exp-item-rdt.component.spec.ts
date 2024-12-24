import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpItemRdtComponent } from './exp-item-rdt.component';

describe('ExpItemRdtComponent', () => {
  let component: ExpItemRdtComponent;
  let fixture: ComponentFixture<ExpItemRdtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ExpItemRdtComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ExpItemRdtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
