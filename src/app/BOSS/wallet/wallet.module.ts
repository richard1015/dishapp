import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WalletComponent } from './wallet.component';
import { WalletRoutes } from './wallet.routing';
import { HeaderModule } from '../../components/header/header.module';

@NgModule({
  imports: [
    CommonModule,
    WalletRoutes,
    HeaderModule
  ],
  declarations: [
    WalletComponent
  ]
})
export class WalletModule { }