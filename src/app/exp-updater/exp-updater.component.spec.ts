import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpUpdaterComponent } from './exp-updater.component';

describe('ExpUpdaterComponent', () => {
  let component: ExpUpdaterComponent;
  let fixture: ComponentFixture<ExpUpdaterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExpUpdaterComponent]
    });
    fixture = TestBed.createComponent(ExpUpdaterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
