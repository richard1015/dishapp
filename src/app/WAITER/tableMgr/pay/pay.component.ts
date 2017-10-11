import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LocalStorage } from '../../../SERVICE/local.storage';
import { ApiService } from '../../../SERVICE/api.service';
declare var layer: any;
@Component({
  selector: 'app-pay',
  templateUrl: './pay.component.html',
  styleUrls: ['./pay.component.css']
})
export class PayComponent implements OnInit, OnDestroy {

  constructor(private api: ApiService,
    private routerInfo: ActivatedRoute,
    private router: Router,
    private ls: LocalStorage) { }
  orderId = "";
  tableId = "";
  orderPrice = this.ls.get("order_price");
  //"付款方式 1 微信个人   2 支付宝个人   3 美团  4 大众点评  5 糯米团购  6现金  7 刷卡 "
  payType = [
    { Id: -1, Name: "退款", Price: '' },
    { Id: 1, Name: "个人微信收款码", Price: '' },
    { Id: 2, Name: "个人支付宝收款码", Price: '' },
    { Id: 3, Name: "美团团购", Price: '' },
    { Id: 4, Name: "大众点评", Price: '' },
    { Id: 5, Name: "糯米团购", Price: '' },
    { Id: 6, Name: "现金", Price: '' },
    { Id: 7, Name: "刷卡", Price: '' }
  ];
  tab = 1;
  staffPayParams = {
    "OrderNum": "",
    "PayMode": []
  };
  payCodeInfo;
  tempInterval = setInterval(() => {
    this.api.Post({
      OrderNumber: this.orderId,
      PageIndex: 1,
      PageSize: 9999
    }, "BGetTableInfoList").subscribe((res) => {
      if (res.State == 0) {
        if (res.Value.OrderState == 2) {
          layer.msg("支付成功！");
          window.history.back();
        }
      }
    });
  }, 1000 * 2);
  ngOnDestroy(): void {
    clearInterval(this.tempInterval);
  }
  ngOnInit() {
    this.orderId = this.routerInfo.snapshot.params["orderid"];
    this.tableId = this.routerInfo.snapshot.params["tableid"];
    this.staffPayParams.OrderNum = this.orderId;
    this.getPayCode();
  }
  getPayCode() {
    this.api.Post({}, "StaffGetPrivatePayQrCode").subscribe(res => {
      this.payCodeInfo = res.Value;
    });
  }
  submit() {
    this.payType.forEach(element => {
      if (element.Price) {
        this.staffPayParams.PayMode.push({
          PayMode: element.Id,
          PayPrice: element.Price
        });
      }
    });
    if (this.staffPayParams.PayMode.length > 0) {
      this.api.Post(this.staffPayParams, "StaffDownPay").subscribe(res => {
        if (res.State == 0) {
          layer.msg(res.Msg);
          // this.router.navigateByUrl("tableMgr");
          window.history.back();
        }
      });
    } else {
      layer.msg("请输入金额！");
    }
  }

}
