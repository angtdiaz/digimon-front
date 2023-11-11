import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { BlankComponent } from './blank/blank.component';
import { FullComponent } from './full/full.component';
import { HeaderComponent } from './header/header.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { SidebarComponent } from './sidebar/sidebar.component';

@NgModule({
  declarations: [BlankComponent, FullComponent, HeaderComponent, SidebarComponent],
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
  ],
})
export class LayoutModule {}
