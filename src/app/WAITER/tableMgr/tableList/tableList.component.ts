import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'app/SERVICE/api.service';
import { LocalStorage } from 'app/SERVICE/local.storage';

@Component({
  selector: 'app-tableList',
  templateUrl: './tableList.component.html',
  styleUrls: ['./tableList.component.css']
})
export class TableListComponent implements OnInit {

  constructor(private api: ApiService,
    private routerInfo: ActivatedRoute,
    private router: Router,
    private ls: LocalStorage) { }

  ngOnInit() {
    this.getTable();
  }

  tableArray = [];
  rightEvent(item) {
    this.router.navigateByUrl("tableMgr/tableList/editTable/0");
  }
  getTable() {
    //-1获取全部，0未开台1已开台
    this.api.Post({
      "DtState": -1,//-1获取全部，0未开台1已开台",
      "PageIndex": "1",
      "PageSize": "9999"
    }, "BGetTableList").subscribe((res) => {
      if (res.State == 0) {
        this.tableArray = res.Value;
      }
    });
  }
}
