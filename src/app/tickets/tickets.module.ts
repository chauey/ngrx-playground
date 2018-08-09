import { NgModule } from '@angular/core';
// import {
//   MatDatepickerModule,
//   MatDialogModule, MatInputModule, MatPaginatorModule, MatProgressSpinnerModule, MatSelectModule,
//   MatSlideToggleModule,
//   MatSortModule, MatTableModule
// } from "@angular/material";
// import { MatTabsModule } from "@angular/material/tabs";
// import { ReactiveFormsModule } from "@angular/forms";
// import { MatMenuModule } from "@angular/material/menu";
// import { MatMomentDateModule } from "@angular/material-moment-adapter";
// import { MatCardModule } from "@angular/material/card";
// import { MatButtonModule } from "@angular/material/button";
// import { MatIconModule } from "@angular/material/icon";
import { RouterModule, Routes } from "@angular/router";
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { SharedModule } from "../shared/shared.module";
import { TicketEffects, ticketsReducer } from '../store/ticket';
import { UserEffects, usersReducer } from '../store/user';
// import { CommonModule } from '@angular/common';
import { HomeComponent } from "../tickets/home/home.component";
import { TicketResolver } from "../tickets/services/ticket.resolver";
import { TicketsService } from "../tickets/services/tickets.service";
import { TicketDialogComponent } from "../tickets/ticket-dialog/ticket-dialog.component";
import { TicketComponent } from "../tickets/ticket/ticket.component";
import { TicketsCardListComponent } from "../tickets/tickets-card-list/tickets-card-list.component";

export const ticketsRoutes: Routes = [
  {
    path: "",
    component: HomeComponent

  },
  {
    path: ':id',
    component: TicketComponent,
    resolve: {
      ticket: TicketResolver
    }
  }
];

@NgModule({
  imports: [
    // CommonModule,
    // // MatButtonModule,
    // // MatIconModule,
    // MatCardModule,
    // MatTabsModule,
    // // MatInputModule,
    // // MatTableModule,
    // MatPaginatorModule,
    // // MatSortModule,
    // MatProgressSpinnerModule,
    // MatSlideToggleModule,
    // MatDialogModule,
    // MatSelectModule,
    // MatDatepickerModule,
    // MatMomentDateModule,
    // ReactiveFormsModule,
    SharedModule,
    RouterModule.forChild(ticketsRoutes),
    StoreModule.forFeature('tickets', ticketsReducer),
    StoreModule.forFeature('users', usersReducer),
    // StoreModule.forFeature('lessons', lessonsReducer),
    EffectsModule.forFeature([TicketEffects]),
    EffectsModule.forFeature([UserEffects])
  ],
  declarations: [HomeComponent, TicketsCardListComponent, TicketDialogComponent, TicketComponent],
  exports: [HomeComponent, TicketsCardListComponent, TicketDialogComponent, TicketComponent],
  entryComponents: [TicketDialogComponent],
  providers: [
    TicketsService,
    TicketResolver
  ]
})
export class TicketsModule {


}
