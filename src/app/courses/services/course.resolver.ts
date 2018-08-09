


import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { select, Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { filter, first, tap } from "rxjs/operators";
import { CourseRequested } from '../../courses/course.actions';
import { selectCourseById } from '../../courses/course.selectors';
import { Course } from "../../courses/model/course";
import { CoursesService } from "../../courses/services/courses.service";
import { AppState } from "../../store";



@Injectable()
export class CourseResolver implements Resolve<Course> {

    constructor(
        private coursesService:CoursesService,
        private store: Store<AppState>) {

    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Course> {

        const courseId = route.params['id'];

        return this.store
          .pipe(
            select(selectCourseById(courseId)),
            tap(course => {
              if (!course) {
                this.store.dispatch(new CourseRequested({courseId}));
              }
            }),
            filter(course => !!course),
            first()
          )

    }

}

