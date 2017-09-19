import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../../SERVICE/api.service';

@Component({
  selector: 'app-dishMenu',
  templateUrl: './dishMenu.component.html',
  styleUrls: ['./dishMenu.component.css']
})
export class DishMenuComponent implements OnInit {

  constructor(
    private api: ApiService,
    private routerInfo: ActivatedRoute,
    private router: Router
  ) { }
  dishMenu: any = [];
  pageindex=1;
  dishlist:any=[];
  ngOnInit() {
    let shopid=this.routerInfo.snapshot.params["id"]||1;
    let openId=this.routerInfo.snapshot.params["openid"]||1;
    this.api.Post({
      ShopId: shopid,
      OpenId: openId
    }, "UserGetShopMenu").subscribe((res) => {
      if (res.State == 0) {
        this.dishMenu = res.Value;
        this.pageindex=0;
        this.dishlist=this.dishMenu[0].List;
      }
    });
  }

}
