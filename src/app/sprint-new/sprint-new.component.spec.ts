import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SprintNewComponent } from './sprint-new.component';

describe('SprintNewComponent', () => {
  let component: SprintNewComponent;
  let fixture: ComponentFixture<SprintNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SprintNewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SprintNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
