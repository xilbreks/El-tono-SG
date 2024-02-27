import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpedienteItemChatComponent } from './expediente-item-chat.component';

describe('ExpedienteItemChatComponent', () => {
  let component: ExpedienteItemChatComponent;
  let fixture: ComponentFixture<ExpedienteItemChatComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExpedienteItemChatComponent]
    });
    fixture = TestBed.createComponent(ExpedienteItemChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
