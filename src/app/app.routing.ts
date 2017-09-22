import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
const routes: Routes = [
    { path: '', component: LoginComponent },
    { path: 'login', component: LoginComponent },
    // --------------顾客-------------------- //
    { path: 'customer', loadChildren: "app/CUSTOMER/index/index.module#IndexModule" },
    // --------------服务员-------------------- //
    { path: 'tableMgr', loadChildren: "app/WAITER/tableMgr/tableMgr.module#TableMgrModule" },
    { path: '**', component: LoginComponent }
];

export const AppRoutes = routes;
