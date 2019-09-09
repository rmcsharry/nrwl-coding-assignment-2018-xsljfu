import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TicketItemComponent } from './ticket-item/ticket-item.component';
import { TicketListComponent } from './ticket-list/ticket-list.component';
import {CustomMaterialModule} from '../custom-material/custom-material.module';
import {Routes, RouterModule} from '@angular/router';

const routes: Routes = [
  { path: '', component: TicketListComponent },
  { path: ':id', component: TicketItemComponent }
];

@NgModule({
  declarations: [
    TicketListComponent,
    TicketItemComponent,
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    CustomMaterialModule
  ]
})
export class TicketsModule { }
