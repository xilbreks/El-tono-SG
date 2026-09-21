import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpItemComunicacionComponent } from './exp-item-comunicacion.component';

describe('ExpItemComunicacionComponent', () => {
  let component: ExpItemComunicacionComponent;
  let fixture: ComponentFixture<ExpItemComunicacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExpItemComunicacionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExpItemComunicacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
