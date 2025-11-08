import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpItemRoadmapComponent } from './exp-item-roadmap.component';

describe('ExpItemRoadmapComponent', () => {
  let component: ExpItemRoadmapComponent;
  let fixture: ComponentFixture<ExpItemRoadmapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ExpItemRoadmapComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ExpItemRoadmapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
