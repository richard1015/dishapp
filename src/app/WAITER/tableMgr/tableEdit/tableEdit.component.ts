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
