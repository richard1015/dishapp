import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../../SERVICE/api.service';
import { LocalStorage } from '../../SERVICE/local.storage';
declare var layer: any;

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
  tableId = this.ls.get("tableid");
  dishMenu: any = [{ List: [] }];
  pageindex = 0;

  sumPrice: number = 0.00;
  ngOnInit() {
    this.api.Post({
      ShopId: this.ls.get("shopid")
    }, "UserGetShopMenu").subscribe((res) => {
      if (res.State == 0) {
        this.dishMenu = res.Value;
        this.pageindex = 0;
      }
    });
  }

  updateNumber(item, number: number) {
    if (number == 1) {
      this.sumPrice += item.Price;
    } else {
      this.sumPrice -= item.Price;
    }
    this.dishMenu.forEach(element => {
      var index = element.List.findIndex(listItem => listItem.Id == item.Id);
      if (index != -1) {
        element.Count += number;
        element.List[index].Num += number;
      }
    });
  }

  submit() {
    let tempArray = [];
    for (var key in this.dishMenu) {
      if (this.dishMenu.hasOwnProperty(key)) {
        var dishList = this.dishMenu[key];
        dishList.List.forEach(element => {
          if (element.Num > 0) {
            var index = tempArray.indexOf(element.Id);
            if (index == -1) {
              tempArray.push(element.Id);
            } else {
              element.Num = 0;
            }
          }
        });
      }
    }


    this.ls.setObject("ask", {
      Ask: "",
      PeoPleNum: ""
    });
    this.ls.setObject("ls_dish", this.dishMenu);

    this.ls.setObject("ls_sumPrice", this.sumPrice);

    this.router.navigateByUrl("customer/orderInfo");
  }

}
