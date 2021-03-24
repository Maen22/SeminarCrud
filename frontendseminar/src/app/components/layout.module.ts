import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout.component';
import { LayoutRoutingModule } from './layout-routing.module';
import { MenubarModule } from 'primeng/menubar';
import { MenuItem } from 'primeng/api';

@NgModule({
  imports: [CommonModule, LayoutRoutingModule, MenubarModule],
  declarations: [LayoutComponent],
})
export class LayoutModule {}
