import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../SERVICE/api.service';
import { LocalStorage } from '../../SERVICE/local.storage';
declare var layer: any;
@Component({
  selector: 'app-tableMgr',
  templateUrl: './tableMgr.component.html',
  styleUrls: ['./tableMgr.component.css']
})
export class TableMgrComponent implements OnInit, OnDestroy {


  constructor(private api: ApiService,
    private routerInfo: ActivatedRoute,
    private router: Router,
    private ls: LocalStorage) { }
  tableListParams = {
    "DtState": -1,//-1获取全部，0未开台1已开台",
    "PageIndex": "1",
    "PageSize": "9999"
  }
  tableArray = [];
  notifyList=[];
  tempInterval = setInterval(() => {
    this.ngOnInit();
  }, 1000 * 30);
  ngOnInit(): void {
    this.getTable();
    this.getNotity();
  }
  ngOnDestroy(): void {
    clearInterval(this.tempInterval);
  }
  getNotity(){
    this.api.Post({}, "StaffStockMsg").subscribe((res) => {
      if (res.State == 0) {
        this.notifyList = res.Value;
      }
    });
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
    this.ls.set("tableidd", item.Id);
    if (item.DtState == 1) {
      this.router.navigateByUrl(`tableMgr/orderCheck/${item.OrderNumber}`);
    } else {
      this.router.navigateByUrl("tableMgr/dishMenu");
    }
  }

  rightEvent(item) {
    this.router.navigateByUrl("tableMgr/editTable");
  }
}
