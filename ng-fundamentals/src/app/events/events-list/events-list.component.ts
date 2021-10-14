import { Component, OnInit } from '@angular/core';
import { NotificationService } from 'src/app/shared/notification.service';
import { EventService } from '../shared/event.service';


@Component({
  templateUrl: './events-list.component.html',
  styleUrls: ['./events-list.component.css'],
})
export class EventsListComponent implements OnInit {
  events: any[] = [];

  constructor(private eventService: EventService, private notificationService: NotificationService) {}

  ngOnInit(): void {
    this.events = this.eventService.getEvents();
  }

  handleThumbnailClick(eventName:string) {
    this.notificationService.info(eventName);
  }
}
