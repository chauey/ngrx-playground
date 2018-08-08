import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog, MatDialogConfig } from "@angular/material";
import { User } from '@app/core';
import { Ticket } from "@app/tickets/model/ticket";
import { TicketDialogComponent } from "@app/tickets/ticket-dialog/ticket-dialog.component";

@Component({
  selector: 'tickets-card-list',
  templateUrl: './tickets-card-list.component.html',
  styleUrls: ['./tickets-card-list.component.css']
})
export class TicketsCardListComponent implements OnInit {

  @Input() tickets: Ticket[];
  @Input() users: User[];
  @Output('complete') completeEvent = new EventEmitter<{ticketId: number, completed: boolean}>();
  @Output('assign') assignEvent = new EventEmitter<{id: number, userId: number}>();

  constructor(private dialog: MatDialog) {
  }

  ngOnInit() {

  }

  editTicket(ticket: Ticket) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '400px';

    dialogConfig.data = ticket;

    const dialogRef = this.dialog.open(TicketDialogComponent,
      dialogConfig);
  }

  toggleComplete(id: number, completed: boolean) {
    this.completeEvent.emit({ ticketId: id, completed: !completed })
  }

  assign(id: number, userId: number) {
    this.assignEvent.emit({ id: id, userId: userId })
  }

  // complete(ticket: Ticket) {
  //   this.completeEvent.emit({ ticketId: ticket.id, completed: !ticket.completed })
  // }

}









