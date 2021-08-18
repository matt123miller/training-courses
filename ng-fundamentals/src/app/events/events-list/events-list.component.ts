import { Component, OnInit } from '@angular/core';
import { events } from './eventsListData';

@Component({
  selector: 'events-list',
  templateUrl: './events-list.component.html',
  styleUrls: ['./events-list.component.css'],
})
export class EventsListComponent implements OnInit {
  events = events;

  ngOnInit(): void {}
}
