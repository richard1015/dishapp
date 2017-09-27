import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../../../SERVICE/api.service';
import { LocalStorage } from '../../../SERVICE/local.storage';
@Component({
  selector: 'app-dishMenuFaster',
  templateUrl: './dishMenuFaster.component.html',
  styleUrls: ['./dishMenuFaster.component.css']
})
export class DishMenuFasterComponent implements OnInit {

  constructor(
    private api: ApiService,
    private routerInfo: ActivatedRoute,
    private router: Router,
    private ls: LocalStorage
  ) { }
  dishMenu: any = [];
  dishlist: any = [];
  py = "";
  sumPrice: number = 0.00;
  // 当orderId不为空时  ，需执行加菜功能
  orderid = "";
  ngOnInit() {
    this.orderid = this.routerInfo.snapshot.params["orderid"];
    this.dishMenu = this.ls.getObject("ls_dish");
  }

  back() {
    window.history.back();
  }
  search() {
    this.dishlist = [];
    this.dishMenu.forEach(element => {
      element.List.forEach(listItem => {
        if (listItem.FPinyin.toLowerCase()[0] == this.py.toLowerCase()) {
          this.dishlist.push(listItem);
        }
      });
    });
  }
  submit() {
    this.ls.setObject("ask", {
      Ask: "",
      PeoPleNum: ""
    });


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
