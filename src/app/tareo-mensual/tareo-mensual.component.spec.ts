import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TareoMensualComponent } from './tareo-mensual.component';

describe('TareoMensualComponent', () => {
  let component: TareoMensualComponent;
  let fixture: ComponentFixture<TareoMensualComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TareoMensualComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TareoMensualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
