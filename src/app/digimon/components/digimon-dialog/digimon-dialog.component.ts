import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IDigimon } from 'src/app/shared/models/digimon.model';
import { DigimonDataService } from '../../services/digimon-data.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-digimon-dialog',
  templateUrl: './digimon-dialog.component.html',
  styleUrls: ['./digimon-dialog.component.scss'],
})
export class DigimonDialogComponent implements OnInit, OnDestroy {
  unsubscribe$ = new Subject<void>();
  isLoading: boolean = false;
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: IDigimon,
    public dialogRef: MatDialogRef<DigimonDialogComponent>,
    private _digimonDataService: DigimonDataService
  ) {
    this.getDigimonById(data.id);
  }
  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
  ngOnInit(): void {}

  /**
   * Retrieves a Digimon by its ID and sets the component's data property to the result.
   * @param id The ID of the Digimon to retrieve.
   */
  getDigimonById(id: number) {
    this.isLoading = true;
    this._digimonDataService
      .getById(id)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: (digimon) => {
          this.isLoading = false;
          this.data = digimon.results as IDigimon;
        },

        error: (err) => {
          this.isLoading = false;
          console.error(err);
        },
      });
  }
}
