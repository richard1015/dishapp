import { Component, OnInit } from '@angular/core';
import { ApiService } from '../SERVICE/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalStorage } from '../SERVICE/local.storage';

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
    "Phone": "18518673872",//-1获取全部，0未开台1已开台",
    "Pwd": "123456"
  }
  ngOnInit() {
  }
  submit() {
    //-1获取全部，0未开台1已开台
    this.api.Post(this.tableListParams, "ShopUserLogin").subscribe((res) => {
      if (res.State == 0) {
        this.ls.setObject("USERINFO", { Guid: res.Value });
        this.router.navigateByUrl("/components/myModule");
      }
    });
  }
}
