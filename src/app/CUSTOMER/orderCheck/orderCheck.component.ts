import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../SERVICE/api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { LocalStorage } from '../../SERVICE/local.storage';

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
      }
    });
  }
  pay() {
    
  }
}
