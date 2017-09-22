import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IndexComponent } from './index.component';
import { HeaderModule } from '../../components/header/header.module';
import { ModuleModule } from '../../components/module/module.module';
import { IndexRoutes } from './index.routing';
import { DishMenuComponent } from '../dishMenu/dishMenu.component';
import { OrderInfoComponent } from '../orderInfo/orderInfo.component';
import { OrderCheckComponent } from '../orderCheck/orderCheck.component';

@NgModule({
  declarations: [
    IndexComponent,
    DishMenuComponent,
    OrderInfoComponent,
    OrderCheckComponent
],
  imports: [
    CommonModule,
    IndexRoutes,
    ModuleModule,
    HeaderModule,
    FormsModule
  ]
})
export class IndexModule { }