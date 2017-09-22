import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LocalStorage } from '../../SERVICE/local.storage';
import { ApiService } from '../../SERVICE/api.service';
@Component({
  selector: 'app-orderInfo',
  templateUrl: './orderInfo.component.html',
  styleUrls: ['./orderInfo.component.css']
})
export class OrderInfoComponent implements OnInit {

  dishMenu: any = [];
  sumPrice: number = 0.00;
  tableId = this.ls.get("tableid");
  UserOrderingParam = {
    Ask: "",
    PeoPleNum: "",
    Menus: [],
    ShopTableId: this.ls.get("tableid"),
    OrderPeopleType: 1,
    OrderNum: ""
  };
  constructor(private api: ApiService,
    private routerInfo: ActivatedRoute,
    private router: Router,
    private ls: LocalStorage) { }
  ngOnInit() {
    this.UserOrderingParam.OrderNum = this.routerInfo.snapshot.params["orderid"];
    this.dishMenu = this.ls.getObject("ls_dish");
    this.sumPrice = this.ls.getObject("ls_sumPrice");
  }
  checkDishList(list: [any]) {
    for (var key in list) {
      if (list.hasOwnProperty(key)) {
        var element = list[key];
        if (element.Num > 0) {
          return false;
        }
      }
    }
    return true;
  }
  submit() {
    for (var key in this.dishMenu) {
      if (this.dishMenu.hasOwnProperty(key)) {
        var dishList = this.dishMenu[key];
        dishList.List.forEach(element => {
          if (element.Num > 0) {
            this.UserOrderingParam.Menus.push({
              Id: element.Id,
              Name: element.Name,
              Num: element.Num,
              Taboos: ""
            });
          }
        });
      }
    }
    // 当orderId不为空时  ，需执行加菜功能
    if (this.UserOrderingParam.OrderNum) {
      this.api.Post(this.UserOrderingParam, "UserAddToOrdering").subscribe((res) => {
        if (res.State == 0) {
          this.router.navigateByUrl(`tableMgr/orderCheck/${res.Value}`);
        }
      });
    } else {
      this.api.Post(this.UserOrderingParam, "UserOrdering").subscribe((res) => {
        if (res.State == 0) {
          this.router.navigateByUrl(`tableMgr/orderCheck/${res.Value}`);
        }
      });
    }
  }
}
