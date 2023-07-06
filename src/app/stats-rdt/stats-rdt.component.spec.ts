import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatsRdtComponent } from './stats-rdt.component';

describe('StatsRdtComponent', () => {
  let component: StatsRdtComponent;
  let fixture: ComponentFixture<StatsRdtComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StatsRdtComponent]
    });
    fixture = TestBed.createComponent(StatsRdtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
