import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalStorage } from '../../../SERVICE/local.storage';
import { ApiService } from '../../../SERVICE/api.service';

@Component({
  selector: 'app-updateTable',
  templateUrl: './updateTable.component.html',
  styleUrls: ['./updateTable.component.css']
})
export class UpdateTableComponent implements OnInit {

  constructor(private api: ApiService,
    private routerInfo: ActivatedRoute,
    private router: Router,
    private ls: LocalStorage) { }
  tableListParams = {
    "DtState": "0",//-1获取全部，0未开台1已开台",
    "PageIndex": "1",
    "PageSize": "9999"
  }

  orderId = "";
  tableName = "";
  tableId = "";
  tableArray = [];
  ngOnInit() {
    this.orderId = this.routerInfo.snapshot.params["orderid"];
    this.tableId = this.ls.get("tableidd");
    this.tableName = this.ls.get("tableid");
    this.getTable();
  }
  getTable() {
    //-1获取全部，0未开台1已开台
    this.api.Post(this.tableListParams, "BGetTableList").subscribe((res) => {
      if (res.State == 0) {
        this.tableArray = res.Value;
      }
    });
  }
  choice(item) {
    this.api.Post({
      OldId: this.tableId,
      NewId: item.Id,
      OrderNumber: this.orderId
    }, "BGetTableChange").subscribe((res) => {
      if (res.State == 0) {
        this.router.navigateByUrl("/tableMgr");
      }
    });
  }
}
