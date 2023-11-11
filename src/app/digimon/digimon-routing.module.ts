import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DigimonPanelComponent } from './digimon-panel/digimon-panel.component';

const routes: Routes = [
  {
    path: '',
    component: DigimonPanelComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DigimonRoutingModule {}
