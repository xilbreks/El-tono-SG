import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RdtEditComponent } from './rdt-edit.component';

describe('RdtEditComponent', () => {
  let component: RdtEditComponent;
  let fixture: ComponentFixture<RdtEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RdtEditComponent]
    });
    fixture = TestBed.createComponent(RdtEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
