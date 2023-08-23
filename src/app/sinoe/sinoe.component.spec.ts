import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SinoeComponent } from './sinoe.component';

describe('SinoeComponent', () => {
  let component: SinoeComponent;
  let fixture: ComponentFixture<SinoeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SinoeComponent]
    });
    fixture = TestBed.createComponent(SinoeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
