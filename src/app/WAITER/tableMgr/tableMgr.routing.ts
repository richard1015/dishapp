import { Routes, RouterModule } from '@angular/router';
import { TableMgrComponent } from './tableMgr.component';
import { DishMenuComponent } from '../dishMenu/dishMenu.component';
import { OrderInfoComponent } from '../orderInfo/orderInfo.component';
import { OrderCheckComponent } from '../orderCheck/orderCheck.component';
import { UpdateTableComponent } from '../updateTable/updateTable.component';
import { DelDishComponent } from '../delDish/delDish.component';
import { PayComponent } from '../pay/pay.component';

const routes: Routes = [
  { path: '', component: TableMgrComponent },
  // 点菜
  { path: 'dishMenu', component: DishMenuComponent },
  // 加菜
  { path: 'dishMenu/:orderid', component: DishMenuComponent },
  // 订单信息
  { path: 'orderInfo', component: OrderInfoComponent },
  // 加菜订单核对
  { path: 'orderInfo/:orderid', component: OrderInfoComponent },
  // 订单核对
  { path: 'orderCheck/:orderid', component: OrderCheckComponent },
  // 转台
  { path: 'updateTable/:orderid/:tableid', component: UpdateTableComponent },
  // 划菜
  { path: 'delDish/:orderid', component: DelDishComponent },
  // 买单
  { path: 'pay/:orderid/:tableid', component: PayComponent }

];

export const TableMgrRoutes = RouterModule.forChild(routes);
