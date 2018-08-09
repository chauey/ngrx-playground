import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { select, Store } from '@ngrx/store';
import { Observable } from "rxjs";
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Ticket, User } from "../../core/model";
import { FilterObserver } from '../../shared/filter';
import { AppState } from '../../store';
import { AddedAction, AllTicketsRequested, AssignedAction, CompleteAction, SetFilterAction } from '../../store/ticket';
import * as fromTickets from '../../store/ticket/ticket.selectors';
import { LoadAction, selectAllUsers } from "../../store/user";
import { TicketDialogComponent } from '../../tickets/ticket-dialog/ticket-dialog.component';
@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  filter: FormControl = new FormControl();

  uncompletedTotal$: Observable<number>;
  users$: Observable<User[]>;

  filterObserver: FilterObserver;

  /** Observable of the filter pattern applied by the entity collection's filter function */
  filter$: Observable<string> | Store<string>;

  /** Observable of entities in the cached collection that pass the filter function */
  // filteredEntities$: Observable<Ticket[]> | Store<Ticket[]>;

  /** Observable true when a multi-entity query command is in progress. */
  loading$: Observable<boolean> | Store<boolean>;
  completedTickets$: Observable<Ticket[]>;
  uncompletedTickets$: Observable<Ticket[]>;

  constructor(private store: Store<AppState>, private dialog: MatDialog) {
  }

  ngOnInit() {
    this.store.dispatch(new AllTicketsRequested());
    this.store.dispatch(new LoadAction());

    this.users$ = this.store.pipe(select(selectAllUsers));
    this.completedTickets$ = this.store.pipe(select(fromTickets.selectCompletedAndFiltered));
    this.uncompletedTickets$ = this.store.pipe(select(fromTickets.selectUncompletedAndFiltered));
    this.uncompletedTotal$ = this.store.pipe(select(fromTickets.selectUncompletedTotal));

    this.filter.valueChanges
      .pipe(debounceTime(300), distinctUntilChanged())
      // no need to unsubscribe because subscribing to self
      .subscribe(pattern => {
        console.log('pattern:' + pattern);
        this.store.dispatch(new SetFilterAction(pattern));
        // this.filterObserver.setFilter(pattern)
      });
  }

  complete(args: { ticketId: number, completed: boolean }) {
    this.store.dispatch(new CompleteAction(args));
  }

  assign(args: { id: number, userId: number }) {
    this.store.dispatch(new AssignedAction(args));
  }

  add(ticket: Ticket) {
    this.store.dispatch(new AddedAction(ticket));
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
