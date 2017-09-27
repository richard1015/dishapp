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
  tableId = this.ls.get("tableid");
  dishMenu: any = [];
  sumPrice: number = 0.00;
  UserOrderingParam = {
    Ask: "",
    PeoPleNum: "",
    Menus: [],
    Guid: this.ls.getObject("USERINFO").Guid,
    ShopTableId: this.ls.get("tableid"),
    OrderPeopleType: 0
  };
  constructor(private api: ApiService,
    private routerInfo: ActivatedRoute,
    private router: Router,
    private ls: LocalStorage) { }
  ngOnInit() {
    this.dishMenu = this.ls.getObject("ls_dish");
    this.sumPrice = this.ls.getObject("ls_sumPrice");
  }
  rightClick(item) {
    this.router.navigateByUrl("/components/taboos");
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
              Taboos: element.checkId || ''
            });
          }
        });
      }
    }
    this.api.Post(this.UserOrderingParam, "UserOrdering").subscribe((res) => {
      if (res.State == 0) {
        this.router.navigateByUrl(`customer/orderCheck/${res.Value}`);
      }
    });
  }
}
