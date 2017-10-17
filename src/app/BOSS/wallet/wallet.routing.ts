import { Routes, RouterModule } from '@angular/router';
import { WalletComponent } from './wallet.component';

const routes: Routes = [
  { path: '', component: WalletComponent },
];

export const WalletRoutes = RouterModule.forChild(routes);
