import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BusinessIncomeComponent } from './businessIncome.component';
import { BusinessIncomeRoutes } from './businessIncome.routing';
import { HeaderModule } from '../../components/header/header.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    HeaderModule,
    FormsModule,
    BusinessIncomeRoutes
  ],
  declarations: [BusinessIncomeComponent]
})
export class BusinessIncomeModule { }