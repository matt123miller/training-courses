import { Component, OnInit, Input, Output } from '@angular/core';

@Component({
  selector: 'events-thumbnail',
  templateUrl: './events-thumbnail.component.html',
  styleUrls: ['./events-thumbnail.component.css'],
})
export class EventsThumbnailComponent implements OnInit {
  @Input() event: any;

  someProperty: string = 'i am prop2';

  constructor() {}

  ngOnInit(): void {}

  logFoo() {
    return this.someProperty;
  }
}
