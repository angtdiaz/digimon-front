import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ConfirmationDialogData } from 'src/app/core/models/confirmation-types';

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.scss'],
})
export class ConfirmationDialogComponent {
  icon: string | undefined;
  color = 'primary';
  iconMap: { [key: string]: string } = {
    error: 'heroicons_outline:exclamation-circle',
    success: 'heroicons_outline:check-circle',
    info: 'mat_outline:help_outline',
  };
  colorMap: { [key: string]: string } = {
    error: 'warn',
    success: 'primary',
    info: 'accent',
  };
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: ConfirmationDialogData,
    public dialogRef: MatDialogRef<ConfirmationDialogComponent>
  ) {
    if (!data.type) data.type = 'info';
    if (data.showIcon) {
      this.icon = this.iconMap[data.type];
    }
    this.color = this.colorMap[data.type];
  }
}
