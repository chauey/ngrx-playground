import { Component, OnInit } from '@angular/core';
import { Ticket } from "@app/core/model";
import { AppState } from '@app/store';
import { AllTicketsRequested, CompleteAction, selectCompletedTickets, selectUncompletedTickets, selectUncompletedTotal } from '@app/store/ticket';
import { LoadAction } from "@app/store/user";
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

  constructor(private store: Store<AppState>) {
  }

  ngOnInit() {
    this.store.dispatch(new AllTicketsRequested());
    this.store.dispatch(new LoadAction());

    this.completedTickets$ = this.store.pipe(select(selectCompletedTickets));
    this.uncompletedTickets$ = this.store.pipe(select(selectUncompletedTickets));
    this.uncompletedTotal$ = this.store.pipe(select(selectUncompletedTotal));
  }

  complete(args: { ticketId: number, completed: boolean }) {
    this.store.dispatch(new CompleteAction(args));
  }

}
