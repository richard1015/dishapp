import { Component, OnInit, OnDestroy } from '@angular/core';
import { ApiService } from '../../SERVICE/api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { LocalStorage } from '../../SERVICE/local.storage';
declare var layer: any;
@Component({
  selector: 'app-orderCheck',
  templateUrl: './orderCheck.component.html',
  styleUrls: ['./orderCheck.component.css']
})
export class OrderCheckComponent implements OnInit, OnDestroy {

  constructor(private api: ApiService,
    private routerInfo: ActivatedRoute,
    private router: Router,
    private ls: LocalStorage) { }

  orderInfo: any = {};
  orderId = "";
  tempInterval = setInterval(() => {
    this.ngOnInit();
  }, 5000);
  ngOnDestroy(): void {
    clearInterval(this.tempInterval);
  }
  ngOnInit() {
    this.orderId = this.routerInfo.snapshot.params["orderid"];
    this.api.Post({
      OrderNumber: this.orderId,
      PageIndex: 1,
      PageSize: 9999
    }, "BGetTableInfoList").subscribe((res) => {
      if (res.State == 0) {
        this.orderInfo = res.Value;
        if (this.orderInfo.OrderState == 2) {
          clearInterval(this.tempInterval);
          this.taPay = false;
          this.payType = "";
        }
      }
    });
  }
  taPay = false;
  payType = "";
  pay() {
    //判断是支付宝app的浏览器
    var userAgent: any = navigator.userAgent.toLowerCase();
    if (userAgent.match(/Alipay/i) == "alipay") {
      // layer.msg("alipay");

      //支付宝
      this.api.Post({
        OrderNo: this.orderId,
        PayType: "alipay"
      }, "DianPay").subscribe((res) => {
        if (res.State == 0) {
          window.location.href = res.Value;
        }
      });
    }
    if (userAgent.match(/MicroMessenger/i) == "micromessenger") {
      layer.msg("请使用微信扫码支付！");
      //微信
      this.taPay = true;
      this.payType = "wx";
    }

  }
}
