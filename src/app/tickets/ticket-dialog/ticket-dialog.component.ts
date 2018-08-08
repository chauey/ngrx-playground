import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { BackendService } from "@app/backend.service";
import { User } from "@app/core";
import { AppState } from "@app/store";
import { TicketSaved } from '@app/store/ticket';
import { selectAllUsers } from "@app/store/user";
import { Ticket } from "@app/tickets/model/ticket";
import { Update } from "@ngrx/entity";
import { select, Store } from "@ngrx/store";
import { Observable } from "rxjs";

@Component({
  selector: 'ticket-dialog',
  templateUrl: './ticket-dialog.component.html',
  styleUrls: ['./ticket-dialog.component.css']
})
export class TicketDialogComponent implements OnInit {
  users$: Observable<User[]>;
  ticketId: number;

  form: FormGroup;
  description: string;

  constructor(
    private store: Store<AppState>,
    // private ticketsService: TicketsService,
    private ticketsService: BackendService,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<TicketDialogComponent>,
    @Inject(MAT_DIALOG_DATA) ticket: Ticket) {

    this.ticketId = ticket.id;
    this.description = ticket.description;

    this.form = fb.group({
      description: [ticket.description, Validators.required],
      completed: [ticket.completed],
      assigneeId: [ticket.assigneeId],
    });
  }

  ngOnInit() {
    this.users$ = this.store.pipe(select(selectAllUsers));;
  }

  assign() {
    const changes = this.form.value;

    this.ticketsService
      .assign(this.ticketId, changes['assigneeId'])
      .subscribe(
        () => {
          const ticket: Update<Ticket> = {
            id: this.ticketId,
            changes
          };

          this.store.dispatch(new TicketSaved({ ticket }));

          this.dialogRef.close();
        }
      );
  }

  save() {
    const changes = this.form.value;
    const ticket: Update<Ticket> = {
      id: this.ticketId,
      changes
    };
    this.store.dispatch(new TicketSaved({ ticket }));
    this.dialogRef.close();

    // TODO: input validation
    // UNDONE: save on service
    // console.log('save undone');
    // this.ticketsService
    // .saveTicket(this.ticketId, changes)
    // .subscribe(
    // () => {
    //   const ticket: Update<Ticket> = {
    //     id: this.ticketId,
    //     changes
    //   };
    //   this.store.dispatch(new TicketSaved({ ticket }));
    //   this.dialogRef.close();
    // }
    // );
  }

  close() {
    this.dialogRef.close();
  }

}
