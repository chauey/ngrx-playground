

import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Ticket } from "@app/tickets/model/ticket";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

@Injectable()
export class TicketsService {

  constructor(private http: HttpClient) {
  }

  findTicketById(ticketId: number): Observable<Ticket> {
    return this.http.get<Ticket>(`/api/tickets/${ticketId}`);
  }

  findAllTickets(): Observable<Ticket[]> {
    return this.http.get('/api/tickets')
      .pipe(
      map(res => res['payload'])
      );
  }

  saveTicket(ticketId: number, changes: Partial<Ticket>) {
    return this.http.put('/api/tickets/' + ticketId, changes);
  }

}
