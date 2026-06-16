import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TareoDiarioAdminComponent } from './tareo-diario-admin.component';

describe('TareoDiarioComponent', () => {
  let component: TareoDiarioAdminComponent;
  let fixture: ComponentFixture<TareoDiarioAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TareoDiarioAdminComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TareoDiarioAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
