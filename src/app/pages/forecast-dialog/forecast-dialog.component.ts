import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';

@Component({
  selector: 'app-forecast-dialog',
  templateUrl: './forecast-dialog.component.html',
  styleUrls: ['./forecast-dialog.component.css'],
  standalone: true,
  imports: [MatDialogModule, CommonModule],
})
export class ForecastDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ForecastDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  closeDialog(): void {
    this.dialogRef.close();
  }
}