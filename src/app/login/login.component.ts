import { Component, OnInit } from '@angular/core';
import { ApiService } from '../SERVICE/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalStorage } from '../SERVICE/local.storage';
declare var layer: any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private api: ApiService,
    private routerInfo: ActivatedRoute,
    private router: Router,
    private ls: LocalStorage) { }
  tableListParams = {
    "Phone": "",//-1获取全部，0未开台1已开台",
    "Pwd": ""
  }
  ngOnInit() {
  }
  submit() {
    if (!this.tableListParams.Phone) {
      layer.msg("请输入手机号！");
      return;
    }
    if (!this.tableListParams.Pwd) {
      layer.msg("请输入密码！");
      return;
    }
    //-1获取全部，0未开台1已开台
    this.api.Post(this.tableListParams, "ShopUserLogin").subscribe((res) => {
      if (res.State == 0) {
        this.ls.setObject("USERINFO", { Guid: res.Value });
        this.router.navigateByUrl("/components/myModule");
      }
    });
  }
}
