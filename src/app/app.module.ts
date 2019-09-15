import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';

import { BackendService } from './backend.service';
import { CustomMaterialModule } from './custom-material/custom-material.module';
import { TicketListComponent } from './ticket-list/ticket-list.component';
import { TicketComponent } from './ticket/ticket.component';
import { TicketNewComponent } from './ticket-new/ticket-new.component';
import { PageTitleComponent } from './page-title/page-title.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TicketFormComponent } from './ticket-form/ticket-form.component';

@NgModule({
  declarations: [
    AppComponent,
    TicketComponent,
    TicketListComponent,
    TicketComponent,
    TicketNewComponent,
    PageTitleComponent,
    TicketFormComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    CustomMaterialModule,
    FlexLayoutModule
  ],
  providers: [BackendService],
  bootstrap: [AppComponent]
})
export class AppModule { }
