import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthUsuariosComponent } from './auth-usuarios.component';

describe('AuthUsuariosComponent', () => {
  let component: AuthUsuariosComponent;
  let fixture: ComponentFixture<AuthUsuariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AuthUsuariosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthUsuariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
