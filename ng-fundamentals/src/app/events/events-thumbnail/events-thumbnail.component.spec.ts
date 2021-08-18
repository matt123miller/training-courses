import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventsThumbnailComponent } from './events-thumbnail.component';

describe('EventsThumbnailComponent', () => {
  let component: EventsThumbnailComponent;
  let fixture: ComponentFixture<EventsThumbnailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EventsThumbnailComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EventsThumbnailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
