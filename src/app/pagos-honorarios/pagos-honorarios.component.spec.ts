import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagosHonorariosComponent } from './pagos-honorarios.component';

describe('PagosHonorariosComponent', () => {
  let component: PagosHonorariosComponent;
  let fixture: ComponentFixture<PagosHonorariosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PagosHonorariosComponent]
    });
    fixture = TestBed.createComponent(PagosHonorariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
