import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpItemAudiencesComponent } from './exp-item-audiences.component';

describe('ExpItemAudiencesComponent', () => {
  let component: ExpItemAudiencesComponent;
  let fixture: ComponentFixture<ExpItemAudiencesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ExpItemAudiencesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ExpItemAudiencesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
