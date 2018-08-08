
import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {MatPaginator, MatSort, MatTableDataSource} from "@angular/material";
import {Course} from "@app/courses/model/course";
import {CoursesService} from "@app/courses/services/courses.service";
import {debounceTime, distinctUntilChanged, startWith, tap, delay} from 'rxjs/operators';
import {merge, fromEvent} from "rxjs";
import {LessonsDataSource} from "@app/courses/services/lessons.datasource";
import {AppState} from '@app/store';
import {select, Store} from '@ngrx/store';
import {PageQuery} from '@app/courses/course.actions';
import {Observable} from 'rxjs';
import {selectLessonsLoading} from '@app/courses/course.selectors';


@Component({
    selector: 'course',
    templateUrl: './course.component.html',
    styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit, AfterViewInit {

    course:Course;

    dataSource: LessonsDataSource;

    displayedColumns = ["seqNo", "description", "duration"];

    @ViewChild(MatPaginator) paginator: MatPaginator;

    loading$ : Observable<boolean>;


    constructor(private route: ActivatedRoute, private store: Store<AppState>) {

    }

    ngOnInit() {

        this.course = this.route.snapshot.data["course"];

        this.loading$ = this.store.pipe(select(selectLessonsLoading));

        this.dataSource = new LessonsDataSource(this.store);

        const initialPage: PageQuery = {
          pageIndex: 0,
          pageSize: 3
        };

        this.dataSource.loadLessons(this.course.id, initialPage);

    }

    ngAfterViewInit() {

        this.paginator.page
          .pipe(
            tap(() => this.loadLessonsPage())
          )
          .subscribe();


    }

    loadLessonsPage() {

      const newPage: PageQuery = {
        pageIndex: this.paginator.pageIndex,
        pageSize: this.paginator.pageSize
      };

      this.dataSource.loadLessons(this.course.id, newPage);

    }


}
