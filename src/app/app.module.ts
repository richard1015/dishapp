import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { IndexComponent } from './index/index.component';
import { OrderInfoComponent } from './orderInfo/orderInfo.component';
import { TaboosComponent } from './taboos/taboos.component';
import { DishProgressComponent } from './dishProgress/dishProgress.component';

import { AddressComponent } from './address/address.component';
import { ConsoleComponent } from './console/console.component';
import { LimitsComponent } from './limits/limits.component';
import { MymoduleComponent } from './myModule/myModule.component';
import { LimitsadminComponent } from './limitsAdmin/limitsAdmin.component';
import { MoneyComponent } from './money/money.component';
import { WithdrawComponent } from './withdraw/withdraw.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    IndexComponent,
    OrderInfoComponent,
    TaboosComponent,
    DishProgressComponent,

    AddressComponent,
    ConsoleComponent,
    LimitsComponent,
    MymoduleComponent,
    LimitsadminComponent,
    MoneyComponent,
    WithdrawComponent
],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
