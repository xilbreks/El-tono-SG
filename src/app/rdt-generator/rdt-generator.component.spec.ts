import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RdtGeneratorComponent } from './rdt-generator.component';

describe('RdtGeneratorComponent', () => {
  let component: RdtGeneratorComponent;
  let fixture: ComponentFixture<RdtGeneratorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RdtGeneratorComponent]
    });
    fixture = TestBed.createComponent(RdtGeneratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
