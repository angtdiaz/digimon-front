import { Component, OnInit, signal } from '@angular/core';

@Component({
  selector: 'app-full',
  templateUrl: './full.component.html',
  styleUrls: ['./full.component.scss'],
})
export class FullComponent implements OnInit {
  showFiller = false;
  drawerOpened = signal(false);
  constructor() {}

  ngOnInit(): void {}
}
