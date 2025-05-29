import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SprintUserComponent } from './sprint-user.component';

describe('SprintUserComponent', () => {
  let component: SprintUserComponent;
  let fixture: ComponentFixture<SprintUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SprintUserComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SprintUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
