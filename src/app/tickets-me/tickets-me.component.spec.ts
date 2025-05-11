import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketsMeComponent } from './tickets-me.component';

describe('TicketsMeComponent', () => {
  let component: TicketsMeComponent;
  let fixture: ComponentFixture<TicketsMeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TicketsMeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TicketsMeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
