


import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { CourseRequested } from '@app/courses/course.actions';
import { selectCourseById } from '@app/courses/course.selectors';
import { Course } from "@app/courses/model/course";
import { CoursesService } from "@app/courses/services/courses.service";
import { AppState } from "@app/store";
import { select, Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { filter, first, tap } from "rxjs/operators";



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

