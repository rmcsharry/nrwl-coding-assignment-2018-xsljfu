import { Component, OnInit, OnDestroy } from '@angular/core';
import {PageService} from '../page.service';
import { Ticket, BackendService } from '../backend.service';
import { tick } from '@angular/core/testing';
import {Subject} from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Router } from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-ticket-new',
  templateUrl: './ticket-new.component.html',
  styleUrls: ['./ticket-new.component.scss']
})
export class TicketNewComponent implements OnInit, OnDestroy {
  ticket: Ticket;
  private destroy$ = new Subject();

  constructor(
    private pageService: PageService,
    private backendService: BackendService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
  }

  ngOnInit() {
    this.pageService.setPageTitle('New ticket');
  }

  ngOnDestroy() {
    this.destroy$.next();
  }

  handleTicketSubmitted(ticket: Ticket) {
    this.backendService.newTicket(ticket).pipe(takeUntil(this.destroy$)).subscribe(
      data => {
        this.ticket = data;
        this.snackBar.open(`Uh huh, ticket ${data.id} created!`, 'x', { duration: 3000 });
        this.router.navigate(['tickets']);
      });
  }
}
