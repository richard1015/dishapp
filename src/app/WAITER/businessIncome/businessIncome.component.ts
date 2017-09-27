import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../SERVICE/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalStorage } from '../../SERVICE/local.storage';

@Component({
  selector: 'app-businessIncome',
  templateUrl: './businessIncome.component.html',
  styleUrls: ['./businessIncome.component.css']
})
export class BusinessIncomeComponent implements OnInit {

  constructor(private api: ApiService,
    private routerInfo: ActivatedRoute,
    private router: Router,
    private ls: LocalStorage) { }

  businessIncomeInfo = {
    List: [],
    ShopName:"",
    Receivable:0,
    Actual:0
  };
  businessIncomeInfoParams = {
    "ShopId": "0",
    "StarTime": "",
    "EndTime": ""
  }
  dateType = 1;
  dateChoice(datetype) {
    this.dateType = datetype;
    switch (datetype) {
      // 昨天
      case -1:
        this.businessIncomeInfoParams.StarTime = this.getRangeDate(-1);
        this.businessIncomeInfoParams.EndTime = this.getRangeDate(-1);
        break;
      // 今天
      case 1:
        this.businessIncomeInfoParams.StarTime = this.getRangeDate(0);
        this.businessIncomeInfoParams.EndTime = this.getRangeDate(0);
        break;
      // 7天
      case 7:
        this.businessIncomeInfoParams.StarTime = this.getRangeDate(-7);
        this.businessIncomeInfoParams.EndTime = this.getRangeDate(0);
        break;
      // 30天
      case 30:
        this.businessIncomeInfoParams.StarTime = this.getRangeDate(-30);
        this.businessIncomeInfoParams.EndTime = this.getRangeDate(0);
        break;
    }
    this.getBusinessIncomeInfo();
  }
  //"付款方式 1 微信个人   2 支付宝个人   3 美团  4 大众点评  5 糯米团购  6现金  7 刷卡 "
  payType = [
    { Id: 0, Name: "线上付款" },
    { Id: 1, Name: "个人微信收款码" },
    { Id: 2, Name: "个人支付宝收款码" },
    { Id: 3, Name: "美团团购" },
    { Id: 4, Name: "大众点评" },
    { Id: 5, Name: "糯米团购" },
    { Id: 6, Name: "现金" },
    { Id: 7, Name: "刷卡" }
  ];
  getPayName(id) {
    return this.payType.find(item => item.Id == id).Name;
  }
  ngOnInit() {
    this.dateChoice(this.dateType);
  }
  getBusinessIncomeInfo() {
    this.api.Post(this.businessIncomeInfoParams, "StaffGetBusinessIncome").subscribe(res => {
      if (res.State == 0) {
        this.businessIncomeInfo = res.Value;
      }
    });
  }
  /**
   * range参数支持正负数，里面也加了判断;type【为可选参数】有两种，一个是字符串one，一个是more；前者返回一个指定的日期；后者返回一个排序好的范围
   * http://blog.csdn.net/crper/article/details/55194334
   * @param {number} range
   * @param {string} [type]
   * @memberOf VehicleOverviewComponent
   * @description 获取今天及前后天
   */
  getRangeDate(range: number, type?: string): any {

    const formatDate = (time: any) => {
      // 格式化日期，获取今天的日期
      const Dates = new Date(time);
      const year: number = Dates.getFullYear();
      const month: any = (Dates.getMonth() + 1) < 10 ? '0' + (Dates.getMonth() + 1) : (Dates.getMonth() + 1);
      const day: any = Dates.getDate() < 10 ? '0' + Dates.getDate() : Dates.getDate();
      return year + '-' + month + '-' + day;
    };

    const now = formatDate(new Date().getTime()); // 当前时间
    const resultArr: Array<any> = [];
    let changeDate: string;
    if (range) {
      if (type) {
        if (type === 'one') {
          changeDate = formatDate(new Date().getTime() + (1000 * 3600 * 24 * range));
          console.log(changeDate);
        }
        if (type === 'more') {
          if (range < 0) {
            for (let i = Math.abs(range); i >= 0; i--) {
              resultArr.push(formatDate(new Date().getTime() + (-1000 * 3600 * 24 * i)));
              console.log(resultArr);
              return changeDate;
            }
          } else {
            for (let i = 1; i <= range; i++) {
              resultArr.push(formatDate(new Date().getTime() + (1000 * 3600 * 24 * i)));
              console.log(resultArr);
              return resultArr;
            }
          }

        }
      } else {
        changeDate = formatDate(new Date().getTime() + (1000 * 3600 * 24 * range));
        console.log(changeDate);
        return changeDate;
      }
    } else {
      console.log(now);
      return now;
    }
  }
}
