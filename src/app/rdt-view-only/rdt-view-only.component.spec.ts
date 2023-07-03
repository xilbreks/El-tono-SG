import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RdtViewOnlyComponent } from './rdt-view-only.component';

describe('RdtViewOnlyComponent', () => {
  let component: RdtViewOnlyComponent;
  let fixture: ComponentFixture<RdtViewOnlyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RdtViewOnlyComponent]
    });
    fixture = TestBed.createComponent(RdtViewOnlyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
