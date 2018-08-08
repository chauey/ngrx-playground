import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { AppState } from "@app/store";
import { selectTicketById, TicketRequested } from '@app/store/ticket';
import { Ticket } from "@app/tickets/model/ticket";
import { TicketsService } from "@app/tickets/services/tickets.service";
import { select, Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { filter, first, tap } from "rxjs/operators";



@Injectable()
export class TicketResolver implements Resolve<Ticket> {

  constructor(
    private ticketsService: TicketsService,
    private store: Store<AppState>) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Ticket> {
    const ticketId = route.params['id'];

    return this.store
      .pipe(
      select(selectTicketById(ticketId)),
      tap(ticket => {
        if (!ticket) {
          this.store.dispatch(new TicketRequested({ ticketId }));
        }
      }),
      filter(ticket => !!ticket),
      first()
      )
  }

}
