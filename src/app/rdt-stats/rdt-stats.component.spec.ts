import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RdtStatsComponent } from './rdt-stats.component';

describe('RdtStatsComponent', () => {
  let component: RdtStatsComponent;
  let fixture: ComponentFixture<RdtStatsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RdtStatsComponent]
    });
    fixture = TestBed.createComponent(RdtStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
