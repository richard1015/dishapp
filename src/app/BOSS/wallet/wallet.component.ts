import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../SERVICE/api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { LocalStorage } from '../../SERVICE/local.storage';
@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.css']
})
export class WalletComponent implements OnInit {

  constructor(private api: ApiService,
    private routerInfo: ActivatedRoute,
    private router: Router,
    private ls: LocalStorage) { }

  walletMoney = {};
  ngOnInit() {
    this.api.Post({}, "ZWalletMoney").subscribe(res => {
      if (res.State == 0)
        this.walletMoney = res.Value;
    });
  }

}
