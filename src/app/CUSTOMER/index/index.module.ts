import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexComponent } from './index.component';
import { HeaderModule } from '../../components/header/header.module';
import { ModuleModule } from '../../components/module/module.module';
import { IndexRoutes } from './index.routing';
import { DishMenuComponent } from '../dishMenu/dishMenu.component';

@NgModule({
  declarations: [
    IndexComponent,
    DishMenuComponent
  ],
  imports: [
    CommonModule,
    IndexRoutes,
    ModuleModule,
    HeaderModule
  ]
})
export class IndexModule { }