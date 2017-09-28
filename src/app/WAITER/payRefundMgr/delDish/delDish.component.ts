import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../SERVICE/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalStorage } from '../../../SERVICE/local.storage';
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
  orderInfo = [];
  ngOnInit() {
    this.orderId = this.routerInfo.snapshot.params["orderid"];
    this.api.Post({
      OrderMenuId: this.orderId
    }, "StaffRefundMenuList").subscribe((res) => {
      if (res.State == 0) {
        this.orderInfo = res.Value;
      }
    });
  }
  delDishArray = [];
  delDesh(item) {
    if (item.MenuNumber > 0) {
      item.MenuNumber -= 1;
      var index = this.delDishArray.findIndex(delItem => delItem.Id == item.ShopMenuId);
      if (index == -1) {
        this.delDishArray.push({
          Id: item.ShopMenuId,
          Num: 1
        });
      } else {
        this.delDishArray[index].Num += 1;
      }
    }
  }
  rightEvent(item) {
    if (this.delDishArray.length > 0) {
      this.api.Post({
        "OrderMenuId": this.orderId,
        "Refunds": this.delDishArray
      }, "StaffRefund").subscribe((res) => {
        if (res.State == 0) {
          layer.msg(res.Msg);
          window.history.back();
        }
      });
    } else {
      layer.msg("请先修改菜品！");
    }
  }
}
