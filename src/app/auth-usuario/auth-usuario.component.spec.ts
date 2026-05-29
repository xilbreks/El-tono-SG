import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthUsuarioComponent } from './auth-usuario.component';

describe('AuthUsuarioComponent', () => {
  let component: AuthUsuarioComponent;
  let fixture: ComponentFixture<AuthUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AuthUsuarioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
