import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from "rxjs";
import { AllCoursesRequested } from '../../courses/course.actions';
import { selectAdvancedCourses, selectBeginnerCourses, selectPromoTotal } from '../../courses/course.selectors';
import { Course } from "../../courses/model/course";
import { AppState } from '../../store';
@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    promoTotal$: Observable<number>;

    beginnerCourses$: Observable<Course[]>;

    advancedCourses$: Observable<Course[]>;

    constructor(private store: Store<AppState>) {

    }

    ngOnInit() {

        this.store.dispatch(new AllCoursesRequested());

        this.beginnerCourses$ = this.store.pipe(select(selectBeginnerCourses));

        this.advancedCourses$ = this.store.pipe(select(selectAdvancedCourses));

        this.promoTotal$ = this.store.pipe(select(selectPromoTotal));

    }

}
