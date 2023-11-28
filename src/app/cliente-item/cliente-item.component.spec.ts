import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClienteItemComponent } from './cliente-item.component';

describe('ClienteItemComponent', () => {
  let component: ClienteItemComponent;
  let fixture: ComponentFixture<ClienteItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClienteItemComponent]
    });
    fixture = TestBed.createComponent(ClienteItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
