import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../SERVICE/api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { LocalStorage } from '../../../SERVICE/local.storage';
declare var layer: any;
@Component({
  selector: 'app-orderCheck',
  templateUrl: './orderCheck.component.html',
  styleUrls: ['./orderCheck.component.css']
})
export class OrderCheckComponent implements OnInit {

  constructor(private api: ApiService,
    private routerInfo: ActivatedRoute,
    private router: Router,
    private ls: LocalStorage) { }

  orderInfo: any = {};
  orderId = "";
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
          this.getOrderD();
        }
      }
    });
  }
  rightEvent(item){
    this.router.navigateByUrl("/tableMgr");
  }
  //"付款方式 1 微信个人   2 支付宝个人   3 美团  4 大众点评  5 糯米团购  6现金  7 刷卡 "
  payType = [
    { Id: -1, Name: "退款" },
    { Id: 1, Name: "个人微信收款码", Price: '' },
    { Id: 2, Name: "个人支付宝收款码", Price: '' },
    { Id: 3, Name: "美团团购", Price: '' },
    { Id: 4, Name: "大众点评", Price: '' },
    { Id: 5, Name: "糯米团购", Price: '' },
    { Id: 6, Name: "现金", Price: '' },
    { Id: 7, Name: "刷卡", Price: '' }
  ];
  orderInfoPrice = "";
  getOrderD() {
    this.api.Post({
      "OrderNumber": this.orderId
    }, "BGetTableInfoByOrder").subscribe((res) => {
      if (res.State == 0) {
        this.orderInfoPrice += "合计" + this.orderInfo.Price;
        res.Value.List.forEach(element => {
          var payName = this.payType.find(payItem => payItem.Id == element.PayMode).Name;
          this.orderInfoPrice += ` , ${payName} : ${element.PayPrice} `;
        });
      }
    });
  }
  pay(){
    this.ls.set("order_price",this.orderInfo.Price);
    this.router.navigateByUrl(`/tableMgr/pay/${this.orderId}/${this.orderInfo.DtNumber}`);
  }
  print() {
    this.api.Post({
      OrderNumber: this.orderId
    }, "BGetPrintOrder").subscribe((res) => {
      if (res.State == 0) {
        layer.msg(res.Msg);
      }
    });
  }
}
