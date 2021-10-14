import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavbarComponent } from './nav/navbar/navbar.component';
import { EventsListComponent } from './events/events-list/events-list.component';
import { EventsThumbnailComponent } from './events/events-thumbnail/events-thumbnail.component';
import { EventDetailsComponent } from './events/event-details/event-details.component';

import { NotificationService } from './shared/notification.service';
import { EventService } from './events/shared/event.service';
import { appRoutes } from './routes';

@NgModule({
  imports: [BrowserModule, RouterModule.forRoot(appRoutes)],
  declarations: [
    AppComponent,
    EventsListComponent,
    EventsThumbnailComponent,
    EventDetailsComponent,
    NavbarComponent,
  ],
  providers: [EventService, NotificationService],
  bootstrap: [AppComponent],
})
export class AppModule {}
