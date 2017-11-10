import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../../../SERVICE/api.service';
import { LocalStorage } from '../../../SERVICE/local.storage';

@Component({
  selector: 'app-bill',
  templateUrl: './bill.component.html',
  styleUrls: ['./bill.component.css']
})
export class BillComponent implements OnInit {

  constructor(private api: ApiService,
    private routerInfo: ActivatedRoute,
    private router: Router,
    private ls: LocalStorage) { }

  params = {
    "StarTime": "",
    "EndTime": "",
    "PageIndex": "1",
    "PageSize": "10"
  }
  orderList = [];
  orderMoney = {
    allPrice: ""
  };
  ngOnInit() {
    this.api.Post(this.params, "ZWalletList").subscribe(res => {
      if (res.State == 0) {
        this.orderList = res.Value;
      }
    });
    this.api.Post(this.params, "ZGetWalletMoneyByID").subscribe(res => {
      if (res.State == 0) {
        this.orderMoney = res.Value;
      }
    });
  }

}
