import { Ticket } from '@app/core';
import { descriptionAndIdFilter } from '@app/store/ticket/ticket.filters';
import { TicketsState } from '@app/store/ticket/ticket.reducers';
import { createEntityAdapter, EntityAdapter } from '@ngrx/entity';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export const selectFilteredEntities = descriptionAndIdFilter;

// export
const adapter: EntityAdapter<Ticket> = createEntityAdapter<Ticket>();

export const {
  selectAll,
  selectEntities,
  selectIds,
  selectTotal
} = adapter.getSelectors();

export const selectState = createFeatureSelector<TicketsState>("tickets");

export const selectById = (ticketId: number) => createSelector(
  selectState,
  ticketsState => ticketsState.entities[ticketId]
);
export const selectAllTickets = createSelector(
  selectState,
  selectAll
);
export const selectCompleted = createSelector(
  selectAllTickets,
  tickets => tickets.filter(ticket => ticket.completed)
);
export const selectUncompleted = createSelector(
  selectAllTickets,
  tickets => tickets.filter(ticket => !ticket.completed)
);

export const getFilterValue = createSelector(
  selectState,
  state => state.filter
);
export const selectFiltered = createSelector(
  selectAllTickets,
  getFilterValue,
  (tickets: Ticket[], filterValue: string) => tickets.filter(ticket => ticket.description.indexOf(filterValue) > -1)
);
export const selectCompletedAndFiltered = createSelector(
  selectCompleted,
  getFilterValue,
  (tickets, filterValue) => selectFilteredEntities(tickets, filterValue)
);
export const selectUncompletedAndFiltered = createSelector(
  selectUncompleted,
  getFilterValue,
  (tickets: Ticket[], filterValue: string) =>  selectFilteredEntities(tickets, filterValue)
);

export const selectUncompletedTotal = createSelector(
  selectAllTickets,
  tickets => tickets.filter(ticket => !ticket.completed).length
);
export const allLoaded = createSelector(
  selectState,
  ticketsState => ticketsState.allTicketsLoaded
);

