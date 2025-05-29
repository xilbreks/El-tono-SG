import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TareoViewComponent } from './tareo-view.component';

describe('TareoViewComponent', () => {
  let component: TareoViewComponent;
  let fixture: ComponentFixture<TareoViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TareoViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TareoViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
