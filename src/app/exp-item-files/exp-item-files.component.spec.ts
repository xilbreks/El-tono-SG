import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpItemFilesComponent } from './exp-item-files.component';

describe('ExpItemFilesComponent', () => {
  let component: ExpItemFilesComponent;
  let fixture: ComponentFixture<ExpItemFilesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ExpItemFilesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ExpItemFilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
