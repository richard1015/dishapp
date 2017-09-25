import { Routes, RouterModule } from '@angular/router';
import { IndexComponent } from './index.component';
import { DishMenuComponent } from '../dishMenu/dishMenu.component';
import { OrderInfoComponent } from '../orderInfo/orderInfo.component';
import { OrderCheckComponent } from '../orderCheck/orderCheck.component';

const routes: Routes = [
  { path: '', component: IndexComponent },
  { path: 'dishMenu', component: DishMenuComponent },
  { path: 'orderInfo', component: OrderInfoComponent },
  { path: 'orderCheck/:orderid', component: OrderCheckComponent }
];

export const IndexRoutes = RouterModule.forChild(routes);
