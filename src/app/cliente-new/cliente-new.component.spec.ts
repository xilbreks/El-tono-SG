import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClienteNewComponent } from './cliente-new.component';

describe('ClienteNewComponent', () => {
  let component: ClienteNewComponent;
  let fixture: ComponentFixture<ClienteNewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClienteNewComponent]
    });
    fixture = TestBed.createComponent(ClienteNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
