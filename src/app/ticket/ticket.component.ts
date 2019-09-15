import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PageService } from '../page.service';
import { BackendService, Ticket, User } from '../backend.service';
import { Observable, Subject } from 'rxjs';
import {tap, takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.scss']
})
export class TicketComponent implements OnInit, OnDestroy {
  public ticket$: Observable<Ticket>;
  public assignee$: Observable<User>;
  private destroy$ = new Subject();

  constructor(
    private route: ActivatedRoute,
    private pageService: PageService,
    private backendService: BackendService,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.params.subscribe(data => {
      this.pageService.setPageTitle(`Ticket ${+data['id']}`);
      this.ticket$ = this.backendService.ticket(+data['id'])
        .pipe(
          tap(t => this.assignee$ = this.getUser(t.assigneeId))
        )
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
  }

  getUser(id: number): Observable<User> {
    return this.backendService.user(id);
  }

  handleTicketSubmitted(ticket: Ticket) {
    this.backendService.updateTicket(ticket).pipe(takeUntil(this.destroy$)).subscribe(
      () => {
        this.router.navigate(['tickets']);
      });
  }
}
