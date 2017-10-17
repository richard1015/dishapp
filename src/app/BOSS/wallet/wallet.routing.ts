import { Routes, RouterModule } from '@angular/router';
import { WalletComponent } from './wallet.component';
import { RechargeComponent } from './recharge/recharge.component';
import { BillComponent } from './bill/bill.component';
import { WithdrawComponent } from './withdraw/withdraw.component';

const routes: Routes = [
  { path: '', component: WalletComponent },
  { path: 'recharge', component: RechargeComponent },
  { path: 'bill', component: BillComponent },
  { path: 'withdraw', component: WithdrawComponent }
];

export const WalletRoutes = RouterModule.forChild(routes);
