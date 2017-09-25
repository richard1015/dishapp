import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../SERVICE/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalStorage } from '../../SERVICE/local.storage';

@Component({
  selector: 'app-mymodule',
  templateUrl: './myModule.component.html',
  styleUrls: ['./myModule.component.css']
})
export class MyModuleComponent implements OnInit {

  //用户所有权限
  userJurs = [];

  constructor(private api: ApiService,
    private routerInfo: ActivatedRoute,
    private router: Router,
    private ls: LocalStorage) { }

  ngOnInit() {
    this.getUserJurs();
  }
  getUserJurs() {
    this.api.Post({}, "UserJurs").subscribe(res => {
      if (res.State == 0) {
        this.userJurs = res.Value;
      }
    });
  }

}
