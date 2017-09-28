import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AccountsBindComponent } from './accountsBind/accountsBind.component';
const routes: Routes = [
    { path: '', component: LoginComponent },
    { path: 'login', component: LoginComponent },
    { path: 'xiao', component: AccountsBindComponent },
    // --------------顾客-------------------- //
    { path: 'customer', loadChildren: "app/CUSTOMER/index/index.module#IndexModule" },
    // 桌台管理
    { path: 'tableMgr', loadChildren: "app/WAITER/tableMgr/tableMgr.module#TableMgrModule" },
    // 退款处理
    { path: 'payRefundMgr', loadChildren: "app/WAITER/payRefundMgr/payRefundMgr.module#PayRefundMgrModule" },
     // 营业收入
     { path: 'businessIncome',loadChildren: "app/WAITER/businessIncome/businessIncome.module#BusinessIncomeModule" },
    // 忌口选择
    { path: 'components/taboos',loadChildren: "app/components/taboos/taboos.module#TaboosModule" },
    // 我的模块
    { path: 'components/myModule',loadChildren: "app/components/myModule/myModule.module#MyModuleModule" },
    { path: '**', component: LoginComponent }
];

export const AppRoutes = routes;
