import { Component, OnInit, OnDestroy } from '@angular/core';
import { BackendService, Ticket, User } from '../services/backend.service';
import { PageService } from '../services/page.service';
import { SearchService } from '../services/search.service';
import { Observable, Subject } from 'rxjs';
import { takeUntil, map, startWith, switchMap, share } from 'rxjs/operators';

@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.scss']
})
export class TicketListComponent implements OnInit, OnDestroy {
  tickets$: Observable<Ticket[]>;
  users$: Observable<User[]>;
  term: string = '';
  destroy$ = new Subject();

  constructor(
    private backendService: BackendService,
    private pageService: PageService,
    private searchService: SearchService
  ) { }

  ngOnInit() {
    this.pageService.setPageTitle('Tickets');
    this.users$ = this.backendService.users();
    this.setUpSearch();
  }

  ngOnDestroy() {
    this.destroy$.next();
  }

  setUpSearch() {
    const searchSource = this.searchService.searchTermStream.pipe(
      map(
        searchTerm => {
          this.term = searchTerm;
          return { search: searchTerm };
        })
    );
    this.tickets$ = searchSource.pipe(
      startWith({ search: this.term }),
      switchMap((params: { search: string }) => {
        return this.backendService.ticketsFiltered(params.search)
      })
    );
  }
}
