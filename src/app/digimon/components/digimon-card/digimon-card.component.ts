import { Component, Input } from '@angular/core';
import { IDigimon } from 'src/app/shared/models/digimon.model';

@Component({
  selector: 'app-digimon-card',
  templateUrl: './digimon-card.component.html',
  styleUrls: ['./digimon-card.component.scss'],
})
export class DigimonCardComponent {
  @Input() digimon: IDigimon;
  constructor() {}
}
