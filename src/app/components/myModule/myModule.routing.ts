import { Routes, RouterModule } from '@angular/router';
import { MyModuleComponent } from './myModule.component';

const routes: Routes = [
  { path:'',component:MyModuleComponent },
];

export const MyModuleRoutes = RouterModule.forChild(routes);
