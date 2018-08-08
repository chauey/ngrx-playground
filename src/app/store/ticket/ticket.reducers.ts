import { Ticket } from '@app/core/model';
import { TicketActions, TicketActionTypes } from '@app/store/ticket/ticket.actions';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

export interface TicketsState extends EntityState<Ticket> {
  allTicketsLoaded: boolean;
  filter: string;
}

export const adapter: EntityAdapter<Ticket> = createEntityAdapter<Ticket>();

export const initialTicketsState: TicketsState = adapter.getInitialState({
  allTicketsLoaded: false,
  filter: null
});

export function ticketsReducer(state = initialTicketsState, action: TicketActions): TicketsState {
  switch (action.type) {
    case TicketActionTypes.TicketLoaded:
      return adapter.addOne(action.payload.ticket, state);
    case TicketActionTypes.AllTicketsLoaded:
      return adapter.addAll(action.payload.tickets, { ...state, allTicketsLoaded: true });
    case TicketActionTypes.TicketSaved:
      return adapter.updateOne(action.payload.ticket, state);

    case TicketActionTypes.Added:
      return adapter.addOne(action.payload, state);
    case TicketActionTypes.Complete:
      return adapter.updateOne({
        id: action.payload.ticketId,
        changes: { completed: action.payload.completed }
      }, state);

    case TicketActionTypes.Assigned:
      return adapter.updateOne({
        id: action.payload.id,
        changes: { assigneeId: action.payload.userId }
      }, state);

    case TicketActionTypes.SET_FILTER:
      return {
        ...state,
        filter: action.payload
      }

    default: {
      return state;
    }
  }
}

export const {
  selectAll,
  selectEntities,
  selectIds,
  selectTotal
} = adapter.getSelectors();
