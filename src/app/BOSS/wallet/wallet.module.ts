import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WalletComponent } from './wallet.component';
import { WalletRoutes } from './wallet.routing';
import { HeaderModule } from '../../components/header/header.module';
import { RechargeComponent } from './recharge/recharge.component';
import { QrcodeModule } from '../../components/qrcode/qrcode.module';
import { BillComponent } from './bill/bill.component';
import { WithdrawComponent } from './withdraw/withdraw.component';

@NgModule({
  imports: [
    CommonModule,
    WalletRoutes,
    HeaderModule,
    QrcodeModule
  ],
  declarations: [
    WalletComponent,
    RechargeComponent,
    BillComponent,
    WithdrawComponent
]
})
export class WalletModule { }