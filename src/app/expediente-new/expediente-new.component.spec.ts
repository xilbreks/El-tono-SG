import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpedienteNewComponent } from './expediente-new.component';

describe('ExpedienteNewComponent', () => {
  let component: ExpedienteNewComponent;
  let fixture: ComponentFixture<ExpedienteNewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExpedienteNewComponent]
    });
    fixture = TestBed.createComponent(ExpedienteNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
