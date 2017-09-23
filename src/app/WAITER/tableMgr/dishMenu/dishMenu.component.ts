import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../../../SERVICE/api.service';
import { LocalStorage } from '../../../SERVICE/local.storage';

@Component({
  selector: 'app-dishMenu',
  templateUrl: './dishMenu.component.html',
  styleUrls: ['./dishMenu.component.css']
})
export class DishMenuComponent implements OnInit {

  constructor(
    private api: ApiService,
    private routerInfo: ActivatedRoute,
    private router: Router,
    private ls: LocalStorage
  ) { }
  dishMenu: any = [];
  pageindex = 1;
  dishlist: any = [];
  sumPrice: number = 0.00;
  // 当orderId不为空时  ，需执行加菜功能
  orderid = "";
  tableid = this.ls.get("tableid");
  ngOnInit() {
    this.orderid = this.routerInfo.snapshot.params["orderid"];
    this.api.Post({
      ShopId: ""
    }, "StaffGetShopMenu").subscribe((res) => {
      if (res.State == 0) {
        this.dishMenu = res.Value;
        this.pageindex = 0;
        this.dishlist = this.dishMenu[0].List;
      }
    });
  }

  submit() {

    this.ls.setObject("ls_dish", this.dishMenu);

    this.ls.setObject("ls_sumPrice", this.sumPrice);
    // 当orderId不为空时  ，需执行加菜功能
    if (this.orderid) {
      this.router.navigateByUrl("/tableMgr/orderInfo/" + this.orderid);
    } else {
      this.router.navigateByUrl("/tableMgr/orderInfo");
    }
  }

}
