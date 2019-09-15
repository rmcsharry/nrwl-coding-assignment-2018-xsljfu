import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PageService } from '../page.service';
import { BackendService, Ticket, User } from '../backend.service';
import { Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';

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
    private backendService: BackendService
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

  getUser(id: number): Observable<User> {
    return this.backendService.user(id);
  }

  ngOnDestroy() {
    this.destroy$.next();
  }
}
