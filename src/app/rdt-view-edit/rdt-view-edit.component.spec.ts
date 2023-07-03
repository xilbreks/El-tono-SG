import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RdtViewEditComponent } from './rdt-view-edit.component';

describe('RdtViewEditComponent', () => {
  let component: RdtViewEditComponent;
  let fixture: ComponentFixture<RdtViewEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RdtViewEditComponent]
    });
    fixture = TestBed.createComponent(RdtViewEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
