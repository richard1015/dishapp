import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../../../../SERVICE/api.service';
import { LocalStorage } from '../../../../SERVICE/local.storage';

@Component({
  selector: 'app-billDetails',
  templateUrl: './billDetails.component.html',
  styleUrls: ['./billDetails.component.css']
})
export class BillDetailsComponent implements OnInit {

  constructor(private api: ApiService,
    private routerInfo: ActivatedRoute,
    private router: Router,
    private ls: LocalStorage) { }

  detailsInfo;
  ngOnInit() {
    this.api.Post({
      "OrderNumber": this.routerInfo.snapshot.params["id"],
      "PageIndex": "1",
      "PageSize": "9999"
    }, "ZGetTableInfoList").subscribe(res => {
      if (res.State == 0)
        this.detailsInfo = res.Value;
    });
  }

}
