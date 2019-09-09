import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BackendService } from './backend.service';
import { CustomMaterialModule } from './custom-material/custom-material.module';
import { TicketItemComponent } from './ticket-item/ticket-item.component';
import { TicketListComponent } from './ticket-list/ticket-list.component';
import { TicketComponent } from './ticket/ticket.component';

@NgModule({
  declarations: [
    AppComponent,
    TicketItemComponent,
    TicketListComponent,
    TicketComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    CustomMaterialModule
  ],
  providers: [BackendService],
  bootstrap: [AppComponent]
})
export class AppModule { }
