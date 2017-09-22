import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';


import { ApiService } from '../../SERVICE/api.service';
import { LocalStorage } from '../../SERVICE/local.storage';

@Component({
  selector: 'app-tableMgr',
  templateUrl: './tableMgr.component.html',
  styleUrls: ['./tableMgr.component.css']
})
export class TableMgrComponent implements OnInit {

  constructor(private api: ApiService,
    private routerInfo: ActivatedRoute,
    private router: Router,
    private ls: LocalStorage) { }
  tableListParams = {
    "DtState": "-1",//-1获取全部，0未开台1已开台",
    "PageIndex": "1",
    "PageSize": "9999"
  }
  tableArray = [];
  ngOnInit() {
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
    this.ls.set("tableid", item.DtNumber);
    if (item.DtState == 1) {
      this.router.navigateByUrl(`tableMgr/orderCheck/${item.OrderNumber}`);
    } else {
      this.router.navigateByUrl("tableMgr/dishMenu");
    }
  }
}
