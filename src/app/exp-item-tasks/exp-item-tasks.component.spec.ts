import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpItemTasksComponent } from './exp-item-tasks.component';

describe('ExpItemTasksComponent', () => {
  let component: ExpItemTasksComponent;
  let fixture: ComponentFixture<ExpItemTasksComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExpItemTasksComponent]
    });
    fixture = TestBed.createComponent(ExpItemTasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
