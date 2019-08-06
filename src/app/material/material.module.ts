import { MatPaginatorImpl } from './../_shared/mat-paginator';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatButtonModule, MatToolbarModule,MatTableModule, MatFormFieldModule, MatInputModule, MatSortModule, MatPaginatorModule, MatPaginatorIntl, MatCardModule, MatIconModule, MatSnackBarModule, MatMenuModule, MatSidenavModule, MatSidenavContent, MatDividerModule, MatDialogModule, MatSelectModule, MatDatepickerModule, MatNativeDateModule, MAT_DATE_LOCALE, MatExpansionModule, MatAutocompleteModule } from '@angular/material';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatButtonModule,
    MatToolbarModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatSortModule,
    MatPaginatorModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
    MatMenuModule,
    MatSidenavModule,
    MatDividerModule,
    MatDialogModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatAutocompleteModule

  ],
  
  exports:[
    MatButtonModule,
    MatToolbarModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatSortModule,
    MatPaginatorModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
    MatMenuModule,
    MatSidenavModule,
    MatDividerModule,
    MatDialogModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatExpansionModule,
    MatAutocompleteModule

  ],
  providers:[
    {provide: MatPaginatorIntl, useClass: MatPaginatorImpl},
    {provide: MAT_DATE_LOCALE, useValue: 'es-ES'}
  ]
})
export class MaterialModule { }
