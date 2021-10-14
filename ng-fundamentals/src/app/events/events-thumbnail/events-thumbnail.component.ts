import { Component, OnInit, Input, Output } from '@angular/core';

@Component({
  selector: 'events-thumbnail',
  templateUrl: './events-thumbnail.component.html',
  styleUrls: ['./events-thumbnail.component.css'],
})
export class EventsThumbnailComponent {
  @Input() event: any;

  getTimeClass() {
    const isEarlyStartTime = this.event?.time === '8:00 am';

    return { green: isEarlyStartTime, bold: isEarlyStartTime };
  }
}
