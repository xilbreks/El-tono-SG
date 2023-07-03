import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminRdtComponent } from './admin-rdt.component';

describe('AdminRdtComponent', () => {
  let component: AdminRdtComponent;
  let fixture: ComponentFixture<AdminRdtComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminRdtComponent]
    });
    fixture = TestBed.createComponent(AdminRdtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
