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
  ngOnInit() {
    if (this.orderid) {
      this.api.Post({
        OrderNo: this.orderid,
        PayType: "wx"
      }, "DianPay").subscribe((res) => {
        if (res.State == 0) {
          this.paylink = res.Value;
        } else {
          this.paylink = "paylink";
        }
      });
    }
  }

}
