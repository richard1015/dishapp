import { Routes, RouterModule } from '@angular/router';
import { IndexComponent } from './index.component';
import { DishMenuComponent } from '../dishMenu/dishMenu.component';

const routes: Routes = [
  { path:'',component: IndexComponent},
  { path:'dishMenu/:id',component: DishMenuComponent}
];

export const IndexRoutes = RouterModule.forChild(routes);
