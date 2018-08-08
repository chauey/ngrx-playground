import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { CourseSaved } from '@app/courses/course.actions';
import { Course } from "@app/courses/model/course";
import { CoursesService } from "@app/courses/services/courses.service";
import { AppState } from "@app/store";
import { Update } from "@ngrx/entity";
import { Store } from "@ngrx/store";

@Component({
    selector: 'course-dialog',
    templateUrl: './course-dialog.component.html',
    styleUrls: ['./course-dialog.component.css']
})
export class CourseDialogComponent implements OnInit {

    courseId:number;

    form: FormGroup;
    description:string;

    constructor(
        private store: Store<AppState>,
        private coursesService: CoursesService,
        private fb: FormBuilder,
        private dialogRef: MatDialogRef<CourseDialogComponent>,
        @Inject(MAT_DIALOG_DATA) course:Course ) {

        this.courseId = course.id;

        this.description = course.description;


        this.form = fb.group({
            description: [course.description, Validators.required],
            category: [course.category, Validators.required],
            longDescription: [course.longDescription,Validators.required],
            promo: [course.promo, []]
        });

    }

    ngOnInit() {

    }


    save() {

        const changes = this.form.value;

        this.coursesService
            .saveCourse(this.courseId, changes)
            .subscribe(
                () => {

                    const course: Update<Course> = {
                      id: this.courseId,
                      changes
                    };

                    this.store.dispatch(new CourseSaved({course}));

                    this.dialogRef.close();
                }
            );
    }

    close() {
        this.dialogRef.close();
    }

}
