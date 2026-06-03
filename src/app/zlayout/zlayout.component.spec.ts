import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZlayoutComponent } from './zlayout.component';

describe('ZlayoutComponent', () => {
  let component: ZlayoutComponent;
  let fixture: ComponentFixture<ZlayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ZlayoutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ZlayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
