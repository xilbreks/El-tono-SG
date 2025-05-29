import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TareoDiarioComponent } from './tareo-diario.component';

describe('TareoDiarioComponent', () => {
  let component: TareoDiarioComponent;
  let fixture: ComponentFixture<TareoDiarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TareoDiarioComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TareoDiarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
