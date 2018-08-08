import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import {
  CompleteAction, CompleteSucceedAction,
  AllTicketsLoaded,
  AllTicketsRequested,
  TicketActionTypes,
  TicketLoaded,
  TicketRequested
} from './ticket.actions';
import { throwError, of } from 'rxjs';
import { catchError, concatMap, exhaustMap, filter, map, mergeMap, withLatestFrom } from "rxjs/operators";
// import { TicketsService } from './services/tickets.service';
import { AppState } from '@app/store';
import { select, Store } from '@ngrx/store';
import { allTicketsLoaded } from './ticket.selectors';
import { BackendService } from "@app/backend.service";

@Injectable()
export class TicketEffects {
  constructor(private actions$: Actions, private ticketsService: BackendService,
    private store: Store<AppState>) {
  }

  @Effect()
  loadTicket$ = this.actions$
    .pipe(
    ofType<TicketRequested>(TicketActionTypes.TicketRequested),
    mergeMap(action => this.ticketsService.ticket(action.payload.ticketId)),
    map(ticket => new TicketLoaded({ ticket }))
    );

  @Effect()
  loadAllTickets$ = this.actions$
    .pipe(
    ofType<AllTicketsRequested>(TicketActionTypes.AllTicketsRequested),
    withLatestFrom(this.store.pipe(select(allTicketsLoaded))),
    filter(([action, allTicketsLoaded]) => !allTicketsLoaded),
    mergeMap(() => this.ticketsService.tickets()),
    map(tickets => new AllTicketsLoaded({ tickets }))
    );

  @Effect()
  completeTicket$ = this.actions$
    .pipe(
    ofType<CompleteAction>(TicketActionTypes.Complete),
    mergeMap(action => this.ticketsService.complete(action.payload.ticketId, action.payload.completed)),
    map(ticket => new CompleteSucceedAction())
    );

  }









