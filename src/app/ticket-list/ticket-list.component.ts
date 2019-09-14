import { Component, OnInit } from '@angular/core';
import {BackendService} from '../backend.service';
import { PageService } from '../page.service';

@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.scss']
})
export class TicketListComponent implements OnInit {
  tickets = this.backend.tickets();
  users = this.backend.users();

  constructor(
    private backend: BackendService,
    private pageService: PageService
  ) { }

  ngOnInit() {
    this.pageService.setPageTitle('Tickets');
  }

}
