import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatCardModule, MatCheckboxModule, MatDatepickerModule, MatDialogModule, MatIconModule, MatInputModule, MatListModule, MatMenuModule, MatPaginatorModule, MatProgressSpinnerModule, MatSelectModule, MatSidenavModule, MatSlideToggleModule, MatSnackBarModule, MatSortModule, MatTableModule, MatTabsModule, MatToolbarModule, MatTooltipModule } from '@angular/material';
import { MatMomentDateModule } from "@angular/material-moment-adapter";
import { FilterComponent } from '../shared/filter/filter.component';


// Other modules that are both imported and exported
export const modules = [
  CommonModule,
  ReactiveFormsModule,

  MatButtonModule,
  MatCardModule,
  MatIconModule,
  MatInputModule,
  MatProgressSpinnerModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatToolbarModule,
  MatTooltipModule,

  MatMenuModule,
  MatListModule,
  MatSidenavModule,

  MatTabsModule,
  MatTableModule,
  MatPaginatorModule,
  MatSortModule,
  MatSlideToggleModule,
  MatDialogModule,
  MatSelectModule,
  MatDatepickerModule,
  MatMomentDateModule,
  MatCheckboxModule,
];

@NgModule({
  imports: [modules],
  exports: [modules, FilterComponent],
  declarations: [FilterComponent]
})
export class SharedModule {}
