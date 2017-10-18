import { Routes, RouterModule } from '@angular/router';
import { WalletComponent } from './wallet.component';
import { RechargeComponent } from './recharge/recharge.component';
import { BillComponent } from './bill/bill.component';
import { WithdrawComponent } from './withdraw/withdraw.component';
import { ExplainComponent } from './bill/explain/explain.component';
import { BillDetailsComponent } from './bill/billDetails/billDetails.component';

const routes: Routes = [
  { path: '', component: WalletComponent },
  { path: 'recharge', component: RechargeComponent },
  { path: 'bill', component: BillComponent },
  { path: 'bill/explain', component: ExplainComponent },
  { path: 'bill/details/:id', component: BillDetailsComponent },
  { path: 'withdraw', component: WithdrawComponent }
];

export const WalletRoutes = RouterModule.forChild(routes);
