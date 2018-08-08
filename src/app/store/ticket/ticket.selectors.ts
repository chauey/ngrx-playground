import * as fromTicket from '@app/store/ticket/ticket.reducers';
import { TicketsState } from '@app/store/ticket/ticket.reducers';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export const selectTicketsState = createFeatureSelector<TicketsState>("tickets");

export const selectTicketById = (ticketId: number) => createSelector(
  selectTicketsState,
  ticketsState => ticketsState.entities[ticketId]
);
export const selectAllTickets = createSelector(
  selectTicketsState,
  fromTicket.selectAll
);
export const selectCompletedTickets = createSelector(
  selectAllTickets,
  tickets => tickets.filter(ticket => ticket.completed)
);
export const selectUncompletedTickets = createSelector(
  selectAllTickets,
  tickets => tickets.filter(ticket => !ticket.completed)
);
export const selectFilteredTickets = (pattern: string) => createSelector(
  selectAllTickets,
  tickets => tickets.filter(ticket => ticket.description.indexOf(pattern) >= -1)
);

export const selectUncompletedTotal = createSelector(
  selectAllTickets,
  tickets => tickets.filter(ticket => !ticket.completed).length
);
export const allTicketsLoaded = createSelector(
  selectTicketsState,
  ticketsState => ticketsState.allTicketsLoaded
);

