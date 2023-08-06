import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RdtViewComponent } from './rdt-view.component';

describe('RdtViewComponent', () => {
  let component: RdtViewComponent;
  let fixture: ComponentFixture<RdtViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RdtViewComponent]
    });
    fixture = TestBed.createComponent(RdtViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
