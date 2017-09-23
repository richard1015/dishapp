import { Routes, RouterModule } from '@angular/router';
import { TaboosComponent } from './taboos.component';

const routes: Routes = [
  { path:'',component:TaboosComponent },
];

export const TaboosRoutes = RouterModule.forChild(routes);
