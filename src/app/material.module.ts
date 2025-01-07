import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSlideToggleModule } from '@angular/material/slide-toggle'; // جدید
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'; // جدید
import { MatDatepickerModule } from '@angular/material/datepicker'; // جدید
import { MatExpansionModule } from '@angular/material/expansion'; // جدید
import { MatMenuModule } from '@angular/material/menu'; // جدید
import { MatTooltipModule } from '@angular/material/tooltip'; // جدید
import { MatTabsModule } from '@angular/material/tabs'; // جدید
import { MatStepperModule } from '@angular/material/stepper'; // جدید
import { MatProgressBarModule } from '@angular/material/progress-bar'; // جدید
import { MatGridListModule } from '@angular/material/grid-list'; // جدید
import { MatListModule } from '@angular/material/list';


@NgModule({
  exports: [
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatToolbarModule,
    MatInputModule,
    MatTableModule,
    MatDialogModule,
    MatSelectModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatSidenavModule,
    MatSnackBarModule,
    MatSlideToggleModule,
    MatProgressSpinnerModule,
    MatDatepickerModule,
    MatExpansionModule,
    MatMenuModule,
    MatTooltipModule,
    MatTabsModule,
    MatStepperModule,
    MatProgressBarModule,
    MatGridListModule,
    MatListModule,
  ],
})
export class MaterialModule {}
