import { PageQuery } from '@app/courses/course.actions';
import * as fromCourse from '@app/courses/course.reducers';
import { CoursesState } from '@app/courses/course.reducers';
import * as fromLesson from '@app/courses/lessons.reducers';
import { LessonsState } from '@app/courses/lessons.reducers';
import { createFeatureSelector, createSelector } from '@ngrx/store';




export const selectCoursesState = createFeatureSelector<CoursesState>("courses");

export const selectLessonsState = createFeatureSelector<LessonsState>("lessons");


export const selectCourseById = (courseId:number) => createSelector(
  selectCoursesState,
  coursesState => coursesState.entities[courseId]
);


export const selectAllCourses = createSelector(
  selectCoursesState,
  fromCourse.selectAll

);

export const selectBeginnerCourses = createSelector(
    selectAllCourses,
    courses => courses.filter(course => course.category === 'BEGINNER')
);


export const selectAdvancedCourses = createSelector(
    selectAllCourses,
    courses => courses.filter(course => course.category === 'ADVANCED')
);

export const selectPromoTotal = createSelector(
  selectAllCourses,
    courses => courses.filter(course => course.promo).length
);


export const allCoursesLoaded = createSelector(
  selectCoursesState,
  coursesState => coursesState.allCoursesLoaded
);


export const selectAllLessons = createSelector(
    selectLessonsState,
    fromLesson.selectAll

);


export const selectLessonsPage = (courseId:number, page:PageQuery) => createSelector(
  selectAllLessons,
  allLessons => {

    const start = page.pageIndex * page.pageSize,
          end = start + page.pageSize;

    return allLessons
            .filter(lesson => lesson.courseId == courseId)
            .slice(start, end);

  }

);


export const selectLessonsLoading = createSelector(
  selectLessonsState,
  lessonsState => lessonsState.loading
);








