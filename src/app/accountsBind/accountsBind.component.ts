import { Component, OnInit } from '@angular/core';
import { ApiService } from '../SERVICE/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalStorage } from '../SERVICE/local.storage';
declare var layer: any;
@Component({
  selector: 'app-accountsBind',
  templateUrl: './accountsBind.component.html',
  styleUrls: ['./accountsBind.component.css']
})
export class AccountsBindComponent implements OnInit {

  constructor(private api: ApiService,
    private routerInfo: ActivatedRoute,
    private router: Router,
    private ls: LocalStorage) { }
  tableListParams = {
    "LjappId": ""
  }
  ngOnInit() {
    this.ls.setObject("USERINFO", {});
    layer.msg("清楚缓登录缓存成功！");
  }
  submit() {
    if (!this.tableListParams.LjappId) {
      layer.msg("请输入ljappid！");
      return;
    }

    this.api.Post(this.tableListParams, "BShopUpLjappId").subscribe((res) => {
      if (res.State == 0) {
        layer.msg(res.Msg);
      }
    });
  }

}
