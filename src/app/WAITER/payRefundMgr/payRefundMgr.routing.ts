import { Routes, RouterModule } from '@angular/router';
import { PayRefundMgrComponent } from './payRefundMgr.component';

const routes: Routes = [
  { path:'',component:PayRefundMgrComponent },
];

export const PayRefundMgrRoutes = RouterModule.forChild(routes);
