import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../SERVICE/api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { LocalStorage } from '../../SERVICE/local.storage';

@Component({
    selector: 'app-index',
    templateUrl: './index.component.html',
    styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

    constructor(private api: ApiService,
        private routerInfo: ActivatedRoute,
        private router: Router,
        private ls: LocalStorage) { }
    tab = 1;

    shopInfo: any = {};
    ngOnInit() {
        let auth_code = this.routerInfo.snapshot.queryParams["auth_code"];
        let tableid = this.routerInfo.snapshot.queryParams["tableid"];
        let shopid = this.routerInfo.snapshot.queryParams["shopid"];
        this.ls.set("tableid", tableid);
        this.ls.set("shopid", shopid);
        //支付宝授权
        // this.alAuth(auth_code);
        this.getUserState(tableid);
        //获取商家信息
        this.api.Post({
            ShopId: shopid
        }, "ShopInfo").subscribe((res) => {
            if (res.State == 0) {
                this.shopInfo = res.Value;
            }
        });
    }
    alAuth(auth_code = "") {
        if (!auth_code) {
            window.location.href = `https://openauth.alipay.com/oauth2/publicAppAuthorize.htm?app_id=2017091808799375&scope=auth_user&redirect_uri=http://d.aibyn.com/AuthLoginCallBack.ashx&state=${encodeURIComponent("http://192.168.1.56:4200/#/customer")}`;
        } else {
            this.getGuid(auth_code);
        }
    }
    getGuid(code) {
        this.api.Post({
            Code: code
        }, "AliAuthLogin").subscribe((res) => {
            if (res.State == 0) {
                this.ls.setObject("USERINFO", res.Value);
            } else {
                this.alAuth();
            }
        });
    }
    getUserState(tableId) {
        this.api.Post({
            ShopTableId: tableId
        }, "UserGetOrderState").subscribe((res) => {
            if (res.State == 0) {
                if (res.Value == true) {
                    this.router.navigateByUrl(`customer/orderCheck/${res.TotalString}`);
                }
            }
        });
    }
}

