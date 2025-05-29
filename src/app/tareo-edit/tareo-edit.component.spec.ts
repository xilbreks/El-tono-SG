import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TareoEditComponent } from './tareo-edit.component';

describe('TareoEditComponent', () => {
  let component: TareoEditComponent;
  let fixture: ComponentFixture<TareoEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TareoEditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TareoEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
