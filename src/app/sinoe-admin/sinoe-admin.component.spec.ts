import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SinoeAdminComponent } from './sinoe-admin.component';

describe('SinoeAdminComponent', () => {
  let component: SinoeAdminComponent;
  let fixture: ComponentFixture<SinoeAdminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SinoeAdminComponent]
    });
    fixture = TestBed.createComponent(SinoeAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
