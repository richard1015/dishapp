import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModuleComponent } from './module.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ModuleComponent],
  bootstrap: [ModuleComponent],
  exports: [ModuleComponent]
})
export class ModuleModule { }