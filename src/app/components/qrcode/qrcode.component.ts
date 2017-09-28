import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from '../../SERVICE/api.service';

@Component({
  selector: 'app-qrcode',
  templateUrl: './qrcode.component.html',
  styleUrls: ['./qrcode.component.css']
})
export class QrcodeComponent implements OnInit {

  constructor(private api: ApiService) { }
  @Input()
  orderid = "";
  paylink = "";
  @Input()
  payType = "";
  payTypeName = "";
  ngOnInit() {
    if (this.orderid) {
      if (this.payType) {
        this.pay(this.payType);
      }
    }
  }
  pay(type) {
    this.payType = type;
    if (type == "alipay") {
      this.payTypeName = "支付宝扫码";
    }
    if (type == "wx") {
      this.payTypeName = "微信扫码";
    }
    this.api.Post({
      OrderNo: this.orderid,
      PayType: type
    }, "DianPay").subscribe((res) => {
      if (res.State == 0) {
        this.paylink = res.Value;
      } else {
        this.paylink = "paylink";
      }
    });
  }
}

