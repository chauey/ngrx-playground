import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { filter, map, mergeMap, withLatestFrom } from "rxjs/operators";
import { BackendService } from "../../backend.service";
// import { TicketsService } from './services/tickets.service';
import { AppState } from '../../store';
import { AllTicketsLoaded, AllTicketsRequested, CompleteAction, CompleteSucceedAction, TicketActionTypes, TicketLoaded, TicketRequested } from './ticket.actions';
import { allLoaded } from './ticket.selectors';

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
    withLatestFrom(this.store.pipe(select(allLoaded))),
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









