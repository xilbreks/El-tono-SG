import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatsGeneratorComponent } from './stats-generator.component';

describe('StatsGeneratorComponent', () => {
  let component: StatsGeneratorComponent;
  let fixture: ComponentFixture<StatsGeneratorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StatsGeneratorComponent]
    });
    fixture = TestBed.createComponent(StatsGeneratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
