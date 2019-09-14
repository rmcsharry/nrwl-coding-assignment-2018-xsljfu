import { Component, OnInit } from '@angular/core';
import {PageService} from '../page.service';

@Component({
  selector: 'app-ticket-new',
  templateUrl: './ticket-new.component.html',
  styleUrls: ['./ticket-new.component.scss']
})
export class TicketNewComponent implements OnInit {

  constructor(
    private pageService: PageService
  ) { }

  ngOnInit() {
    this.pageService.setPageTitle('New ticket');
  }

}
