import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColaboradorRdtComponent } from './colaborador-rdt.component';

describe('ColaboradorRdtComponent', () => {
  let component: ColaboradorRdtComponent;
  let fixture: ComponentFixture<ColaboradorRdtComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ColaboradorRdtComponent]
    });
    fixture = TestBed.createComponent(ColaboradorRdtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
