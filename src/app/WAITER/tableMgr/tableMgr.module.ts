import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TableMgrComponent } from './tableMgr.component';
import { TableMgrRoutes } from './tableMgr.routing';
import { ModuleModule } from '../../components/module/module.module';
import { HeaderModule } from '../../components/header/header.module';
import { QrcodeModule } from '../../components/qrcode/qrcode.module';
import { DishMenuComponent } from './dishMenu/dishMenu.component';
import { OrderInfoComponent } from './orderInfo/orderInfo.component';
import { OrderCheckComponent } from './orderCheck/orderCheck.component';
import { UpdateTableComponent } from './updateTable/updateTable.component';
import { DelDishComponent } from './delDish/delDish.component';
import { PayComponent } from './pay/pay.component';
import { TableEditComponent } from './tableEdit/tableEdit.component';

@NgModule({
  imports: [
    CommonModule,
    TableMgrRoutes,
    ModuleModule,
    HeaderModule,
    QrcodeModule,
    FormsModule
  ],
  declarations: [
    TableMgrComponent,
    DishMenuComponent,
    OrderInfoComponent,
    OrderCheckComponent,
    UpdateTableComponent,
    DelDishComponent,
    PayComponent, 
    TableEditComponent,
]
})
export class TableMgrModule { }