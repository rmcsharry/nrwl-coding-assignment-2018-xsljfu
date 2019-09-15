import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { delay, tap } from 'rxjs/operators';
import { del } from 'selenium-webdriver/http';
import { match } from 'minimatch';

/**
 * This service acts as a mock back-end.
 * It has some intentional errors that you might have to fix.
 */

export type User = {
  id: number;
  name: string;
};

export type Ticket = {
  id: number;
  description: string;
  assigneeId: number;
  completed: boolean;
};

function randomDelay() {
  return Math.random() * 4000;
}

@Injectable()
export class BackendService {
  storedTickets: Ticket[] = [
    {
      id: 0,
      description: 'Install a monitor arm',
      assigneeId: 111,
      completed: false
    },
    {
      id: 1,
      description: 'Move the desk to the new location',
      assigneeId: 111,
      completed: false
    }
  ];

  storedUsers: User[] = [{ id: 111, name: 'Victor' }, { id: 33, name: 'Richard'}];

  lastId = 1;

  constructor() { }

  private findTicketById = id =>
    this.storedTickets.find(ticket => ticket.id === +id);
  private findUserById = id => this.storedUsers.find(user => user.id === +id);

  private matchTerm = (ticket: Ticket, term: string) =>
    ticket.description.includes(term)

  ticketsFiltered(term) {
    const filtered = this.storedTickets.filter(ticket => this.matchTerm(ticket, term));
    return of(filtered).pipe(delay(randomDelay()));
  }

  tickets() {
    return of(this.storedTickets).pipe(delay(randomDelay()));
  }

  ticket(id: number): Observable<Ticket> {
    return of(this.findTicketById(id)).pipe(delay(randomDelay()));
  }

  users() {
    return of(this.storedUsers).pipe(delay(randomDelay()));
  }

  user(id: number) {
    return of(this.findUserById(id)).pipe(delay(randomDelay()));
  }

  newTicket(payload: Ticket) {
    const newTicket: Ticket = {
      id: ++this.lastId,
      description: payload.description,
      assigneeId: payload.assigneeId,
      completed: payload.completed
    };

    return of(newTicket).pipe(
      delay(randomDelay()),
      tap((ticket: Ticket) => { this.storedTickets.push(ticket); console.log(this.storedTickets) })
    );
  }

  assign(ticketId: number, userId: number) {
    const foundTicket = this.findTicketById(+ticketId);
    const user = this.findUserById(+userId);

    if (foundTicket && user) {
      return of(foundTicket).pipe(
        delay(randomDelay()),
        tap((ticket: Ticket) => {
          ticket.assigneeId = +userId;
        })
      );
    }

    return throwError(new Error('ticket or user not found'));
  }

  updateTicket(payload: Ticket) {
    const ticketIndex = this.storedTickets.findIndex((obj => obj.id == +payload.id));

    this.storedTickets[ticketIndex] = payload;
    return of(this.storedTickets[ticketIndex]).pipe(
      delay(randomDelay())
    );
  }
  complete(ticketId: number, completed: boolean) {
    const foundTicket = this.findTicketById(+ticketId);
    if (foundTicket) {
      return of(foundTicket).pipe(
        delay(randomDelay()),
        tap((ticket: Ticket) => {
          ticket.completed = true;
        })
      );
    }

    return throwError(new Error('ticket not found'));
  }
}
