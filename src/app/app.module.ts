import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { IndexComponent } from './index/index.component';
import { OrderInfoComponent } from './orderInfo/orderInfo.component';
import { TaboosComponent } from './taboos/taboos.component';
import { DishProgressComponent } from './dishProgress/dishProgress.component';

import { AddressComponent } from './address/address.component';
import { OrderCheckComponent } from './orderCheck/orderCheck.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    IndexComponent,
    OrderInfoComponent,
    TaboosComponent,
    DishProgressComponent,
    AddressComponent,
    OrderCheckComponent
],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
