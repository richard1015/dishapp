import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LocalStorage } from '../../../SERVICE/local.storage';
import { ApiService } from '../../../SERVICE/api.service';
declare var layer: any;
@Component({
  selector: 'app-dishNotify',
  templateUrl: './dishNotify.component.html',
  styleUrls: ['./dishNotify.component.css']
})
export class DishNotifyComponent implements OnInit {

  constructor(private api: ApiService,
    private routerInfo: ActivatedRoute,
    private router: Router,
    private ls: LocalStorage) { }
  id = "";
  dishName = "";
  notifyTableList = [];
  ngOnInit() {
    this.id = this.routerInfo.snapshot.params["id"];
    this.dishName = this.routerInfo.snapshot.params["name"];
    this.getNotifyTable();
  }
  getNotifyTable() {
    this.api.Post({ ShopMenuId: this.id }, "StaffStockMsgInfo").subscribe(res => {
      if (res.State == 0) {
        this.notifyTableList = res.Value;
      }
    });
  }
  submit() {
    this.api.Post({ ShopMenuId: this.id }, "StaffStockMsgConfirm").subscribe(res => {
      if (res.State == 0) {
        layer.msg(res.Msg);
        window.history.back();
      }
    });
  }
}
