import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PayRefundMgrComponent } from './payRefundMgr.component';
import { PayRefundMgrRoutes } from './payRefundMgr.routing';
import { HeaderModule } from '../../components/header/header.module';
import { DelDishComponent } from './delDish/delDish.component';

@NgModule({
  imports: [
    CommonModule,
    PayRefundMgrRoutes,
    HeaderModule
  ],
  declarations: [
    PayRefundMgrComponent,
    DelDishComponent
  ]
})
export class PayRefundMgrModule { }