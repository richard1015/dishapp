import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HashLocationStrategy, LocationStrategy } from "@angular/common";
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';


// base
import { AppComponent } from './app.component';
// components 

// login
import { LoginComponent } from './login/login.component';

//----------
// import { OrderInfoComponent } from './orderInfo/orderInfo.component';
// import { DishProgressComponent } from './dishProgress/dishProgress.component';
// import { AddressComponent } from './address/address.component';
// import { OrderCheckComponent } from './orderCheck/orderCheck.component';
// import { ConsoleComponent } from './console/console.component';
// import { LimitsComponent } from './limits/limits.component';
// import { MymoduleComponent } from './myModule/myModule.component';
// import { LimitsadminComponent } from './limitsAdmin/limitsAdmin.component';
// import { MoneyComponent } from './money/money.component';
// import { WithdrawComponent } from './withdraw/withdraw.component';
// import { PayChoiceComponent } from './payChoice/payChoice.component';
// import { PayCodeComponent } from './payCode/payCode.component';

import { AppRoutes } from './app.routing';
import { ApiService } from './SERVICE/api.service';
import { LocalStorage } from './SERVICE/local.storage';
import { UploadService } from './SERVICE/upload.service';
import { WebSocketService } from './SERVICE/webSocket.service';

@NgModule({
  declarations: [
    AppComponent,
    // HeaderComponent,
    // OrderInfoComponent,
    // TaboosComponent,
    // DishProgressComponent,
    // AddressComponent,
    // OrderCheckComponent,
    // AddressComponent,
    // ConsoleComponent,
    // LimitsComponent,
    // MymoduleComponent,
    // LimitsadminComponent,
    // MoneyComponent,
    // WithdrawComponent,
    // PayChoiceComponent,
    // PayCodeComponent,
    LoginComponent,
    // ModuleComponent
],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    RouterModule.forRoot(AppRoutes)
  ],
  providers: [
    UploadService,
    ApiService,
    WebSocketService,
    LocalStorage,
    {
    provide: LocationStrategy,
    useClass: HashLocationStrategy
    }
],
  bootstrap: [AppComponent]
})
export class AppModule { }
