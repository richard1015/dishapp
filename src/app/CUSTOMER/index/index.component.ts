import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../SERVICE/api.service';

@Component({
    selector: 'app-index',
    templateUrl: './index.component.html',
    styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

    constructor(private api: ApiService) { }
    tab = 1;

    shopInfo:any={};
    ngOnInit() {
        this.api.Post({
            "ShopId": "1"
        }, "ShopInfo").subscribe((res)=>{
            if(res.State==0){
                this.shopInfo=res.Value;
            }
        });
    }
}

