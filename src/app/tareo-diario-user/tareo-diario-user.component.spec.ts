import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TareoDiarioUserComponent } from './tareo-diario-user.component';

describe('TareoDiarioUserComponent', () => {
  let component: TareoDiarioUserComponent;
  let fixture: ComponentFixture<TareoDiarioUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TareoDiarioUserComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TareoDiarioUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
