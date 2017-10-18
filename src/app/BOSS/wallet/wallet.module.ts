import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WalletComponent } from './wallet.component';
import { WalletRoutes } from './wallet.routing';
import { HeaderModule } from '../../components/header/header.module';
import { RechargeComponent } from './recharge/recharge.component';
import { QrcodeModule } from '../../components/qrcode/qrcode.module';
import { BillComponent } from './bill/bill.component';
import { WithdrawComponent } from './withdraw/withdraw.component';
import { FormsModule } from '@angular/forms';
import { ExplainComponent } from './bill/explain/explain.component';
import { BillDetailsComponent } from './bill/billDetails/billDetails.component';

@NgModule({
  imports: [
    CommonModule,
    WalletRoutes,
    HeaderModule,
    QrcodeModule,
    FormsModule
  ],
  declarations: [
    WalletComponent,
    RechargeComponent,
    BillComponent,
    WithdrawComponent,
    ExplainComponent,
    BillDetailsComponent
]
})
export class WalletModule { }