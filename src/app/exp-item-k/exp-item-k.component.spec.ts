import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpItemKComponent } from './exp-item-k.component';

describe('ExpItemKComponent', () => {
  let component: ExpItemKComponent;
  let fixture: ComponentFixture<ExpItemKComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ExpItemKComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ExpItemKComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
