import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaboosComponent } from './taboos.component';
import { TaboosRoutes } from './taboos.routing';
import { HeaderModule } from '../header/header.module';

@NgModule({
  imports: [
    CommonModule,
    TaboosRoutes,
    HeaderModule
  ],
  declarations: [TaboosComponent]
})
export class TaboosModule { }