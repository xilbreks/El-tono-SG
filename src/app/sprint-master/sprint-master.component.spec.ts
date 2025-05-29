import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SprintMasterComponent } from './sprint-master.component';

describe('SprintMasterComponent', () => {
  let component: SprintMasterComponent;
  let fixture: ComponentFixture<SprintMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SprintMasterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SprintMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
