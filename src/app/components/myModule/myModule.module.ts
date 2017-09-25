import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyModuleComponent } from './myModule.component';
import { MyModuleRoutes } from './myModule.routing';
import { HeaderModule } from '../header/header.module';
import { ModuleModule } from '../module/module.module';

@NgModule({
  imports: [
    CommonModule,
    MyModuleRoutes,
    HeaderModule,
    ModuleModule
  ],
  declarations: [MyModuleComponent]
})
export class MyModuleModule { }