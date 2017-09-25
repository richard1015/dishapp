import { Routes, RouterModule } from '@angular/router';
import { BusinessIncomeComponent } from './businessIncome.component';

const routes: Routes = [
  { path: '', component: BusinessIncomeComponent },
];

export const BusinessIncomeRoutes = RouterModule.forChild(routes);
