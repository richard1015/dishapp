import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
const routes: Routes = [
    { path: '', component: LoginComponent },
    { path: 'login', component: LoginComponent },
    // --------------顾客-------------------- //
    { path: 'customer', loadChildren: "app/CUSTOMER/index/index.module#IndexModule" },
    // 桌台模块
    { path: 'tableMgr', loadChildren: "app/WAITER/tableMgr/tableMgr.module#TableMgrModule" },
    // 退款模块
    { path: 'payRefundMgr', loadChildren: "app/WAITER/payRefundMgr/payRefundMgr.module#PayRefundMgrModule" },
    // 公用模块
    { path: 'components/taboos',loadChildren: "app/components/taboos/taboos.module#TaboosModule" },
    { path: '**', component: LoginComponent }
];

export const AppRoutes = routes;
