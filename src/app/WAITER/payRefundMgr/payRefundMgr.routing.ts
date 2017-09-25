import { Routes, RouterModule } from '@angular/router';
import { PayRefundMgrComponent } from './payRefundMgr.component';
import { DelDishComponent } from './delDish/delDish.component';

const routes: Routes = [
  { path: '', component: PayRefundMgrComponent },
  // 划菜
  { path: 'delDish/:orderid', component: DelDishComponent },
];

export const PayRefundMgrRoutes = RouterModule.forChild(routes);
