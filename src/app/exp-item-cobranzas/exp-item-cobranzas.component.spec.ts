import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpItemCobranzasComponent } from './exp-item-cobranzas.component';

describe('ExpItemCobranzasComponent', () => {
  let component: ExpItemCobranzasComponent;
  let fixture: ComponentFixture<ExpItemCobranzasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExpItemCobranzasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExpItemCobranzasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
