import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../SERVICE/api.service';
import { ActivatedRoute, Router } from '@angular/router';
declare var layer: any;
@Component({
  selector: 'app-tableEdit',
  templateUrl: './tableEdit.component.html',
  styleUrls: ['./tableEdit.component.css']
})
export class TableEditComponent implements OnInit {

  constructor(private api: ApiService,
    private routerInfo: ActivatedRoute,
    private router: Router,
  ) { }
  editTableParams: any = {
    Id: "0",
    DtNumber: "",
    DtPeople: ""
  }
  ngOnInit() {
    this.editTableParams.Id = this.routerInfo.snapshot.params["id"] || "0";
    if(this.editTableParams.Id!=0){
      this.getInfo();
    }
  }
  getInfo() {
    this.api.Post({ Id: this.editTableParams.Id }, "BGetTableInfoById").subscribe(res => {
      if (res.State == 0) {
          this.editTableParams.DtNumber=res.Value[0].DtNumber;
          this.editTableParams.DtPeople=res.Value[0].DtPeople;
      }
    });
  }
  rightEvent(item) {
    this.api.Post(this.editTableParams, "BGetTableAdd").subscribe(res => {
      if (res.State == 0) {
        layer.msg(res.Msg);
        this.router.navigateByUrl("tableMgr");
      }
    });
  }
}
