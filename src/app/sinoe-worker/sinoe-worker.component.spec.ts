import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SinoeWorkerComponent } from './sinoe-worker.component';

describe('SinoeWorkerComponent', () => {
  let component: SinoeWorkerComponent;
  let fixture: ComponentFixture<SinoeWorkerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SinoeWorkerComponent]
    });
    fixture = TestBed.createComponent(SinoeWorkerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
