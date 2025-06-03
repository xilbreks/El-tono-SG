import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TareoSupervisorComponent } from './tareo-supervisor.component';

describe('TareoSupervisorComponent', () => {
  let component: TareoSupervisorComponent;
  let fixture: ComponentFixture<TareoSupervisorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TareoSupervisorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TareoSupervisorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
