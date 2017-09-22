import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QrcodeComponent } from './qrcode.component';
import { QRCodeModule } from 'angular2-qrcode';

@NgModule({
  imports: [
    CommonModule,
    QRCodeModule
  ],
  declarations: [QrcodeComponent],
  bootstrap:[QrcodeComponent],
  exports:[QrcodeComponent]
})
export class QrcodeModule { }