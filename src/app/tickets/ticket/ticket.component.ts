
import { AfterViewInit, ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from "@angular/material";
import { ActivatedRoute } from "@angular/router";
import { Ticket } from "@app/tickets/model/ticket";
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
// import {LessonsDataSource} from "../services/lessons.datasource";
import { AppState } from '../../store';
import { PageQuery } from '../../store/ticket';
// import {selectLessonsLoading} from '../ticket.selectors';

@Component({
  selector: 'ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TicketComponent implements OnInit, AfterViewInit {
  ticket: Ticket;
  // dataSource: LessonsDataSource;
  displayedColumns = ["description", "completed", "assigneeId"];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  loading$: Observable<boolean>;

  constructor(private route: ActivatedRoute, private store: Store<AppState>) {
  }

  ngOnInit() {
    this.ticket = this.route.snapshot.data["ticket"];
    // this.loading$ = this.store.pipe(select(selectLessonsLoading));
    // this.dataSource = new LessonsDataSource(this.store);

    const initialPage: PageQuery = {
      pageIndex: 0,
      pageSize: 3
    };

    // this.dataSource.loadLessons(this.ticket.id, initialPage);
  }

  ngAfterViewInit() {
    // this.paginator.page
    //   .pipe(
    //   tap(() => this.loadLessonsPage())
    //   )
    //   .subscribe();
  }

  // loadLessonsPage() {
  //   const newPage: PageQuery = {
  //     pageIndex: this.paginator.pageIndex,
  //     pageSize: this.paginator.pageSize
  //   };

  //   // this.dataSource.loadLessons(this.ticket.id, newPage);
  // }

}
