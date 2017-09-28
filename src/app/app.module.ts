import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HashLocationStrategy, LocationStrategy } from "@angular/common";
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
// base
import { AppComponent } from './app.component';
// login
import { LoginComponent } from './login/login.component';

import { AppRoutes } from './app.routing';
import { ApiService } from './SERVICE/api.service';
import { LocalStorage } from './SERVICE/local.storage';
import { UploadService } from './SERVICE/upload.service';
import { WebSocketService } from './SERVICE/webSocket.service';
//肖 要的临时页面
import { AccountsBindComponent } from './accountsBind/accountsBind.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AccountsBindComponent
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
