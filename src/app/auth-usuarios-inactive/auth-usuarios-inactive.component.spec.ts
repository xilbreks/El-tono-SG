import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthUsuariosInactiveComponent } from './auth-usuarios-inactive.component';

describe('AuthUsuariosInactiveComponent', () => {
  let component: AuthUsuariosInactiveComponent;
  let fixture: ComponentFixture<AuthUsuariosInactiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AuthUsuariosInactiveComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthUsuariosInactiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
