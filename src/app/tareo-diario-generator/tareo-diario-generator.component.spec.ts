import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TareoDiarioGeneratorComponent } from './tareo-diario-generator.component';

describe('TareoDiarioGeneratorComponent', () => {
  let component: TareoDiarioGeneratorComponent;
  let fixture: ComponentFixture<TareoDiarioGeneratorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TareoDiarioGeneratorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TareoDiarioGeneratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
