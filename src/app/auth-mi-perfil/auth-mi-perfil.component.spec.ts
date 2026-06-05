import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthMiPerfilComponent } from './auth-mi-perfil.component';

describe('AuthMiPerfilComponent', () => {
  let component: AuthMiPerfilComponent;
  let fixture: ComponentFixture<AuthMiPerfilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AuthMiPerfilComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthMiPerfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
