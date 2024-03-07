import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpItemChatComponent } from './exp-item-chat.component';

describe('ExpItemChatComponent', () => {
  let component: ExpItemChatComponent;
  let fixture: ComponentFixture<ExpItemChatComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExpItemChatComponent]
    });
    fixture = TestBed.createComponent(ExpItemChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
