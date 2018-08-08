import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { Ticket, User } from "@app/core/model";
import { FilterObserver } from '@app/shared/filter';
import { AppState } from '@app/store';
import { AddedAction, AllTicketsRequested, AssignedAction, CompleteAction, selectCompletedTickets, selectFilteredTickets, selectUncompletedTickets, selectUncompletedTotal, SetFilterAction } from '@app/store/ticket';
import { LoadAction, selectAllUsers } from "@app/store/user";
import { TicketDialogComponent } from '@app/tickets/ticket-dialog/ticket-dialog.component';
import { select, Store } from '@ngrx/store';
import { Observable } from "rxjs";
@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  uncompletedTotal$: Observable<number>;
  completedTickets$: Observable<Ticket[]>;
  uncompletedTickets$: Observable<Ticket[]>;
  users$: Observable<User[]>;

  filterObserver: FilterObserver;
  // filteredTickets$: Observable<Ticket[]>;
  // loading$: Observable<boolean>;

  /** Observable of the filter pattern applied by the entity collection's filter function */
  filter$: Observable<string> | Store<string>;

  /** Observable of entities in the cached collection that pass the filter function */
  filteredEntities$: Observable<Ticket[]> | Store<Ticket[]>;

  /** Observable true when a multi-entity query command is in progress. */
  loading$: Observable<boolean> | Store<boolean>;
  filteredTickets$: any;

  constructor(private store: Store<AppState>, private dialog: MatDialog) {
    this.filterObserver = {
      filter$: this.filter$,
      setFilter: this.setFilter.bind(this)
    };
  }

    /**
   * Set the pattern that the collection's filter applies
   * when using the `filteredEntities` selector.
   */
  setFilter(pattern: any): void {
    this.store.dispatch(new SetFilterAction(pattern));
    // this.dispatcher.setFilter(pattern);
  }

  ngOnInit() {
    this.store.dispatch(new AllTicketsRequested());
    this.store.dispatch(new LoadAction());

    this.users$ = this.store.pipe(select(selectAllUsers));
    this.completedTickets$ = this.store.pipe(select(selectCompletedTickets));
    this.uncompletedTickets$ = this.store.pipe(select(selectUncompletedTickets));
    this.uncompletedTotal$ = this.store.pipe(select(selectUncompletedTotal));
    this.filteredTickets$ = this.store.pipe(select(selectFilteredTickets));

    // this.filterObserver = this.ticketsService.filterObserver;
    // this.filteredTickets$ = this.ticketsService.filteredEntities$;
    // this.loading$ = this.heroesService.loading$;
  }

  complete(args: { ticketId: number, completed: boolean }) {
    this.store.dispatch(new CompleteAction(args));
  }

  assign(args: { id: number, userId: number }) {
    this.store.dispatch(new AssignedAction(args));
  }


  // close() {
  //   this.selectedTicket = null;
  // }

  enableAddMode() {
    // this.selectedTicket = <any>{};
  }

  getTickets() {
    // this.ticketsService.getAll();
    // this.close();
  }

  add(ticket: Ticket) {
    this.store.dispatch(new AddedAction(ticket));
    // this.ticketsService.add(ticket);
  }

  addTicket() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '400px';

    dialogConfig.data = new Ticket();// ticket;

    const dialogRef = this.dialog.open(TicketDialogComponent,
      dialogConfig);
  }

  // delete(ticket: Ticket) {
  //   this.close();
  //   this.ticketsService.delete(ticket);
  // }

  // select(ticket: Ticket) {
  //   this.selectedTicket = ticket;
  // }

  // update(ticket: Ticket) {
  //   this.ticketsService.update(ticket);
  // }

}
