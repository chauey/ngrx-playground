import { Ticket } from "@app/core/model";
import { Update } from '@ngrx/entity';
import { Action } from '@ngrx/store';

// import {Lesson} from './model/lesson';

export enum TicketActionTypes {
  Assigned = '[Ticket] Assigned',
  AssignSucceeded = '[Ticket] Assign Succeeded',
  Complete = '[Ticket] Completed',
  CompleteSucceed = '[Ticket] Completed Succeed',

  TicketRequested = '[View Ticket Page] Ticket Requested',
  TicketLoaded = '[Tickets API] Ticket Loaded',
  AllTicketsRequested = '[Tickets Home Page] All Tickets Requested',
  AllTicketsLoaded = '[Tickets API] All Tickets Loaded',
  TicketSaved = '[Edit Ticket Dialog] Ticket Saved',
  LessonsPageRequested = '[Ticket Landing Page] Lessons Page Requested',
  LessonsPageLoaded = '[Tickets API] Lessons Page Loaded',
  LessonsPageCancelled = '[Tickets API] Lessons Page Cancelled'
}

export interface PageQuery {
  pageIndex: number;
  pageSize: number;
}

export class AssignedAction implements Action {
  readonly type = TicketActionTypes.Assigned;
  constructor(public payload: { id: number, userId: number }) {
  }
}
export class AssignSucceededAction implements Action {
  readonly type = TicketActionTypes.AssignSucceeded;
  constructor() {
  }
}
export class CompleteAction implements Action {
  readonly type = TicketActionTypes.Complete;
  constructor(public payload: { ticketId: number, completed: boolean }) {
  }
}
export class CompleteSucceedAction implements Action {
  readonly type = TicketActionTypes.CompleteSucceed;
  constructor() {
  }
}


export class TicketRequested implements Action {
  readonly type = TicketActionTypes.TicketRequested;
  constructor(public payload: { ticketId: number }) {
  }
}
export class TicketLoaded implements Action {
  readonly type = TicketActionTypes.TicketLoaded;
  constructor(public payload: { ticket: Ticket }) {
  }
}
export class AllTicketsRequested implements Action {
  readonly type = TicketActionTypes.AllTicketsRequested;
}
export class AllTicketsLoaded implements Action {
  readonly type = TicketActionTypes.AllTicketsLoaded;
  constructor(public payload: { tickets: Ticket[] }) {
  }
}
export class TicketSaved implements Action {
  readonly type = TicketActionTypes.TicketSaved;
  constructor(public payload: { ticket: Update<Ticket> }) { }
}

export type TicketActions =
  AssignedAction | AssignSucceededAction |
  CompleteAction | CompleteSucceedAction |
  TicketRequested
  | TicketLoaded
  | AllTicketsRequested
  | AllTicketsLoaded
  | TicketSaved;
