import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecursosItersComponent } from './recursos-iters.component';

describe('RecursosItersComponent', () => {
  let component: RecursosItersComponent;
  let fixture: ComponentFixture<RecursosItersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RecursosItersComponent]
    });
    fixture = TestBed.createComponent(RecursosItersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
