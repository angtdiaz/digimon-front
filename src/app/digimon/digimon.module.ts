import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DigimonRoutingModule } from './digimon-routing.module';
import { DigimonPanelComponent } from './digimon-panel/digimon-panel.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { DigimonCardComponent } from './components/digimon-card/digimon-card.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import {
  MatProgressSpinner,
  MatProgressSpinnerModule,
} from '@angular/material/progress-spinner';
import { DigimonDialogComponent } from './components/digimon-dialog/digimon-dialog.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';

@NgModule({
  declarations: [
    DigimonPanelComponent,
    DigimonCardComponent,
    DigimonDialogComponent,
  ],
  imports: [
    CommonModule,
    DigimonRoutingModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    InfiniteScrollModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatButtonModule,
    MatDividerModule,
  ],
})
export class DigimonModule {}
