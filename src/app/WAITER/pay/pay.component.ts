import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LocalStorage } from '../../SERVICE/local.storage';
import { ApiService } from '../../SERVICE/api.service';

@Component({
  selector: 'app-pay',
  templateUrl: './pay.component.html',
  styleUrls: ['./pay.component.css']
})
export class PayComponent implements OnInit {

  constructor(private api: ApiService,
    private routerInfo: ActivatedRoute,
    private router: Router,
    private ls: LocalStorage) { }
  orderId = "";
  tableId = "";
  tab = 1;
  ngOnInit() {
    this.orderId = this.routerInfo.snapshot.params["orderid"];
    this.tableId = this.routerInfo.snapshot.params["tableid"];
  }

}
