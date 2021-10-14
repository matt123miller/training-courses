import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { EventsListComponent } from './events/events-list/events-list.component';
import { EventsThumbnailComponent } from './events/events-thumbnail/events-thumbnail.component';
import { NavbarComponent } from './nav/navbar/navbar.component';

import { NotificationService } from './shared/notification.service';
import { EventService } from './events/shared/events.service';

@NgModule({
  imports: [BrowserModule],
  declarations: [
    AppComponent,
    EventsListComponent,
    EventsThumbnailComponent,
    NavbarComponent,
  ],
  providers: [EventService, NotificationService],
  bootstrap: [AppComponent],
})
export class AppModule {}
