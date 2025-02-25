import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TicketListComponent } from './ticket-list/ticket-list.component';
import { TicketComponent } from './ticket/ticket.component';
import { TicketNewComponent } from './ticket-new/ticket-new.component';

const routes: Routes = [
  { path: 'tickets', component: TicketListComponent },
  { path: 'ticket/new', component: TicketNewComponent },
  { path: 'ticket/:id', component: TicketComponent },
  { path: '', redirectTo: 'tickets', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
