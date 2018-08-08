import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from "@angular/forms";
import { MatDatepickerModule, MatDialogModule, MatInputModule, MatPaginatorModule, MatProgressSpinnerModule, MatSelectModule, MatSlideToggleModule, MatSortModule, MatTableModule } from "@angular/material";
import { MatMomentDateModule } from "@angular/material-moment-adapter";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
import { MatTabsModule } from "@angular/material/tabs";
import { RouterModule, Routes } from "@angular/router";
import { CourseDialogComponent } from "@app/courses/course-dialog/course-dialog.component";
import { CourseEffects } from '@app/courses/course.effects';
import { coursesReducer } from '@app/courses/course.reducers';
import { CourseComponent } from "@app/courses/course/course.component";
import { CoursesCardListComponent } from "@app/courses/courses-card-list/courses-card-list.component";
import { HomeComponent } from "@app/courses/home/home.component";
import { lessonsReducer } from '@app/courses/lessons.reducers';
import { CourseResolver } from "@app/courses/services/course.resolver";
import { CoursesService } from "@app/courses/services/courses.service";
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';


export const coursesRoutes: Routes = [
    {
        path: "",
        component: HomeComponent

    },
    {
        path: ':id',
        component: CourseComponent,
        resolve: {
            course: CourseResolver
        }
    }
];



@NgModule({
    imports: [
        CommonModule,
        MatButtonModule,
        MatIconModule,
        MatCardModule,
        MatTabsModule,
        MatInputModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        MatProgressSpinnerModule,
        MatSlideToggleModule,
        MatDialogModule,
        MatSelectModule,
        MatDatepickerModule,
        MatMomentDateModule,
        ReactiveFormsModule,
        RouterModule.forChild(coursesRoutes),
        StoreModule.forFeature('courses', coursesReducer),
        StoreModule.forFeature('lessons', lessonsReducer),
        EffectsModule.forFeature([CourseEffects])
    ],
    declarations: [HomeComponent, CoursesCardListComponent, CourseDialogComponent, CourseComponent],
    exports: [HomeComponent, CoursesCardListComponent, CourseDialogComponent, CourseComponent],
    entryComponents: [CourseDialogComponent],
    providers: [
        CoursesService,
        CourseResolver
    ]
})
export class CoursesModule {


}