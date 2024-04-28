import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZDownloaderComponent } from './z-downloader.component';

describe('ZDownloaderComponent', () => {
  let component: ZDownloaderComponent;
  let fixture: ComponentFixture<ZDownloaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ZDownloaderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ZDownloaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
