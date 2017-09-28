import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../SERVICE/api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { LocalStorage } from '../../SERVICE/local.storage';
declare var layer: any;
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
    tableid = "";
    shopid = "";
    shopInfo: any = {};
    ngOnInit() {

        //判断是支付宝app的浏览器
        var userAgent: any = navigator.userAgent.toLowerCase();
        if (userAgent.match(/Alipay/i) == "alipay") {
            // layer.msg("alipay");
        } else if (userAgent.match(/MicroMessenger/i) == "micromessenger") {
            // layer.msg("wechat");
        } else {
            layer.msg("请使用支付宝或微信扫码！");
            return;
        }


        let auth_code = this.routerInfo.snapshot.queryParams["auth_code"];
        let wx_code = this.routerInfo.snapshot.queryParams["code"];
        this.tableid = this.routerInfo.snapshot.queryParams["tableid"];
        this.shopid = this.routerInfo.snapshot.queryParams["shopid"];
        this.ls.set("tableidd", this.tableid);
        this.ls.set("shopid", this.shopid);

        if (this.ls.getObject("USERINFO").Guid) {
            this.getUserState(this.tableid);
            this.getShopInfo();
        } else {
            //判断是支付宝app的浏览器
            var userAgent: any = navigator.userAgent.toLowerCase();
            if (userAgent.match(/Alipay/i) == "alipay") {
                // layer.msg("alipay");
                //支付宝授权
                this.alAuth(auth_code);
            }
            if (userAgent.match(/MicroMessenger/i) == "micromessenger") {
                // layer.msg("wechat");
                //微信刷新
                this.wxAuth(wx_code);
            }
        }
    }
    wxAuth(wx_code = "") {
        if (!wx_code) {
            var url = `http://d.aibyn.com/WxAuth.html?backUrl=${encodeURIComponent(window.location.href)}`;
            window.location.href = url;
        } else {
            this.getGuidWx(wx_code);
        }
    }
    alAuth(auth_code = "") {
        if (!auth_code) {
            var url = `https://openauth.alipay.com/oauth2/publicAppAuthorize.htm?app_id=2017091808799375&scope=auth_user&redirect_uri=http://d.aibyn.com/AuthLoginCallBack.ashx&state=${encodeURIComponent(window.location.href)}`;
            window.location.href = url;
        } else {
            this.getGuidAl(auth_code);
        }
    }
    getShopInfo() {
        //获取商家信息
        this.api.Post({
            ShopId: this.shopid,
            TableId: this.tableid
        }, "ShopInfo").subscribe((res) => {
            if (res.State == 0) {
                this.shopInfo = res.Value;
                this.ls.set("tableid", this.shopInfo.DtNumber);
            }
        });
    }
    //微信授权
    getGuidWx(code) {
        this.api.Post({
            Code: code
        }, "WeixinAuthLogin").subscribe((res) => {
            if (res.State == 0) {
                this.ls.setObject("USERINFO", res.Value);

                this.getUserState(this.tableid);
                this.getShopInfo();

            } else {
                //  this.alAuth();
                layer.msg("微信授权失败，请重新扫码！");
            }
        });
    }
    //支付宝授权
    getGuidAl(code) {
        this.api.Post({
            Code: code
        }, "AliAuthLogin").subscribe((res) => {
            if (res.State == 0) {
                this.ls.setObject("USERINFO", res.Value);

                this.getUserState(this.tableid);
                this.getShopInfo();

            } else {
                //  this.alAuth();
                layer.msg("支付宝授权失败，请重新扫码！");
            }
        });
    }
    tableState = false;
    tableLock = true;
    orderId = "";
    getUserState(tableId) {
        this.api.Post({
            ShopTableId: tableId
        }, "UserGetOrderState").subscribe((res) => {
            if (res.State == 0) {
                if (res.Value == true) {
                    this.tableState = true;
                    this.orderId = res.TotalString;
                }
            } else {
                this.tableLock = false;
            }
        });
    }
    diancan() {
        if (this.tableLock) {
            if (this.tableState) {
                this.router.navigateByUrl(`customer/orderCheck/${this.orderId}`);
            } else {
                this.router.navigateByUrl(`customer/dishMenu`);
            }
        } else {
            layer.msg("该桌台已经有人在用餐了，请换一桌！");
        }
    }
    pay() {
        if (this.tableState) {
            this.router.navigateByUrl(`customer/orderCheck/${this.orderId}`);
        } else {
            layer.msg("请先点餐！");
        }
    }
}

