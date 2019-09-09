import {Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.scss']
})
export class TicketComponent implements OnInit {
  @Input() ticketId: Number = 0;

  constructor() { }

  ngOnInit() {
  }

}
