import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../SERVICE/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalStorage } from '../../SERVICE/local.storage';
declare var layer: any;
@Component({
  selector: 'app-delDish',
  templateUrl: './delDish.component.html',
  styleUrls: ['./delDish.component.css']
})
export class DelDishComponent implements OnInit {

  constructor(private api: ApiService,
    private routerInfo: ActivatedRoute,
    private router: Router,
    private ls: LocalStorage) { }

  orderId = "";
  orderInfo = {};
  ngOnInit() {
    this.orderId = this.routerInfo.snapshot.params["orderid"];
    this.api.Post({
      OrderNumber: this.orderId,
      PageIndex: 1,
      PageSize: 9999
    }, "BGetTableInfoList").subscribe((res) => {
      if (res.State == 0) {
        this.orderInfo = res.Value;
      }
    });
  }
  delDesh(item) {
    if (item.MenuNumber == 0) {
      return;
    }
    this.api.Post({
      OrderNum: this.orderId,
      ShopMenuId: item.ShopMenuId
    }, "UserReduceOrdering").subscribe((res) => {
      if (res.State == 0) {
        item.MenuNumber -= 1;
        layer.msg(res.Msg);
      }
    });
  }
}
