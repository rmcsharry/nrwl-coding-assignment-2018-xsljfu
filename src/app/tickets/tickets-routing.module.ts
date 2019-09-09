import {Routes, RouterModule} from '@angular/router';
import { ModuleWithProviders } from '@angular/compiler/src/core';

import {TicketItemComponent} from './ticket-item/ticket-item.component';
import { TicketListComponent } from './ticket-list/ticket-list.component';

const routes: Routes = [
  { path: 'tickets', component: TicketListComponent },
  { path: ':id', component: TicketItemComponent }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);
