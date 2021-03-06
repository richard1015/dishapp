import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../SERVICE/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalStorage } from '../../SERVICE/local.storage';

@Component({
  selector: 'app-payRefundMgr',
  templateUrl: './payRefundMgr.component.html',
  styleUrls: ['./payRefundMgr.component.css']
})
export class PayRefundMgrComponent implements OnInit {

  constructor(private api: ApiService,
    private routerInfo: ActivatedRoute,
    private router: Router,
    private ls: LocalStorage) { }

  payRefundInfo = [];
  ngOnInit() {
    this.api.Post({}, "StaffReturnManager").subscribe(res => {
      if (res.State == 0) {
        this.payRefundInfo = res.Value;
      }
    });
  }

}
