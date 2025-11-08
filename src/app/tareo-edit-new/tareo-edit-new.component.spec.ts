import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TareoEditNewComponent } from './tareo-edit-new.component';

describe('TareoEditNewComponent', () => {
  let component: TareoEditNewComponent;
  let fixture: ComponentFixture<TareoEditNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TareoEditNewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TareoEditNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
