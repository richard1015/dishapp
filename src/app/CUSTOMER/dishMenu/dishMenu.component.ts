import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../../SERVICE/api.service';
import { LocalStorage } from '../../SERVICE/local.storage';
import { retry } from '../../../../node_modules/_rxjs@5.5.2@rxjs/operator/retry';
import { forEach } from '../../../../node_modules/_@angular_router@4.4.6@@angular/router/src/utils/collection';
declare var layer: any;

@Component({
  selector: 'app-dishMenu',
  templateUrl: './dishMenu.component.html',
  styleUrls: ['./dishMenu.component.css']
})
export class DishMenuComponent implements OnInit {
  //遮罩状态
  maskState = false;
  //购物车状态
  shoppingState = false;
  //选择口味状态
  choiceTaboosState = false;
  //用户选择 菜品口味
  itemdish = {
    FNames: "",
    Num: 0
  };
  constructor(
    private api: ApiService,
    private routerInfo: ActivatedRoute,
    private router: Router,
    private ls: LocalStorage
  ) { }
  tableId = this.ls.get("tableid");
  dishMenu: any = [{ List: [] }];
  pageindex = 0;

  sumPrice: number = 0.00;
  sumDishCount: number = 0;
  ngOnInit() {
    this.api.Post({
      ShopId: this.ls.get("shopid")
    }, "UserGetShopMenu").subscribe((res) => {
      if (res.State == 0) {
        this.dishMenu = res.Value;
        this.pageindex = 0;
        this.dishMenuList = this.dishMenu[this.pageindex].List;
      }
    });
  }
  dishMenuList = [];
  categoryChoice(idx) {
    let dishMenuListDiv = document.querySelector('ul.right');
    dishMenuListDiv.scrollTop = 0;
    this.pageindex = idx;
    this.dishMenuList = [];
    this.dishMenuList = this.dishMenu[this.pageindex].List;
  }
  onScroll(event) {
    console.log('scroll event', event);
  }
  //购物车数组
  shoppingList = [];
  private checkShoppingState(item) {
    //判断是否已在购物车中
    let object = this.shoppingList;
    for (const key in object) {
      if (object.hasOwnProperty(key)) {
        const element = object[key];
        if (element.Id == item.Id && this.checkArray(element.checkName, item.checkName)) {
          //有口味时 需要 添加总数，无口味外部已添加
          if (item.FNames) {
            element.Num += item.Num;
          } else {
            element.Num = item.Num;
          }
          return false;
        }
      }
    }
    return true;
  }
  private checkArray(array1, array2): boolean {
    if (array1 && array2) {
      if (array1.toString() == array2.toString()) {
        return true;
      } else {
        return false;
      }
    } else if (array1 == array2) {
      return true;
    } else {
      return false;
    }
  }
  choiceDishtaboos(itemdish, idx) {
    if (!itemdish.checkName) itemdish.checkName = [];

    let fname = itemdish.FNames.split(',')[idx];
    let index = itemdish.checkName.findIndex(item => item == fname);
    if (index == -1) {
      //多选
      // itemdish.checkName.push(fname);
      //单选
      itemdish.checkName[0] = fname;
    }
    else {
      itemdish.checkName.splice(index, 1);
      if (itemdish.checkName.length == 0) {
        itemdish.checkName = null;
      }
    }
  }
  checkActive(lable, itemdish, idx) {
    if (itemdish.checkName) {
      if (itemdish.checkName.indexOf(lable) != -1) {
        return true;
      }
    }
    return false;
  }
  //托管值
  private delegateNumber: number = -1;
  taboosOk() {
    this.updateNumberSubmit(this.itemdish, this.delegateNumber);
    this.maskClick();
  }
  private updateNumberSubmit(item, number: number) {
    if (number == 1) {
      //有口味时
      if (item.FNames) {
        this.sumPrice += item.Price * item.Num;
        let tempObj = JSON.parse(JSON.stringify(item));
        if (this.checkShoppingState(tempObj)) {
          this.shoppingList.push(tempObj);
        }
      } else {
        this.sumPrice += item.Price * 1;
        let tempObj = JSON.parse(JSON.stringify(item));
        if (this.checkShoppingState(tempObj)) {
          this.shoppingList.push(tempObj);
        }
      }

    } else {
      this.sumPrice -= item.Price;
    }
    this.dishMenu.forEach(element => {
      var index = element.List.findIndex(listItem => listItem.Id == item.Id);
      if (index != -1) {
        if (number == 1) {
          //判断当前菜品是否口味选择
          if (item.FNames) {
            element.Count += item.Num;
            element.List[index].Num += item.Num;
          } else {
            element.Count += 1;
            element.List[index].Num = item.Num;
          }
        } else {
          element.Count -= 1;
          element.List[index].Num -= 1;
        }
      }
    });
    //购物车同步 -1 
    if (number == - 1) {
      //判断是否删除成功，如果没有说明是  点击菜品删除，而不是点击购物车删除
      let deleted = false;
      let deletedDelNum, deletedIndex = -1;
      //判断是否已在购物车中
      let object = this.shoppingList;
      for (const key in object) {
        if (object.hasOwnProperty(key)) {
          const element = object[key];
          if (element.Id == item.Id && this.checkArray(element.checkName, item.checkName)) {
            element.Num -= 1;
            deleted = true;
            deletedDelNum = element.Num;
            deletedIndex = parseInt(key);
            break;
          }
        }
      }
      //判断是否删除成功，如果没有说明是  点击菜品删除，而不是点击购物车删除
      if (!deleted) {
        var index = this.shoppingList.findIndex(listItem => listItem.Id == item.Id);
        if (index != -1) {
          this.shoppingList[index].Num -= 1;
          deletedDelNum = this.shoppingList[index].Num;
          deletedIndex = index;
        }
      }
      //删除购物车中0 的对象
      if (deletedDelNum == 0) {
        this.shoppingList.splice(deletedIndex, 1);
      }
    }
    //计算所有菜品数量
    this.sumDishCount = 0;
    this.shoppingList.forEach(element => {
      this.sumDishCount += element.Num;
    });
  }
  updateNumber(item, number: number) {
    this.delegateNumber = number;
    //判断当前菜品是否口味选择
    if (item.FNames && number == 1) {
      this.itemdish = JSON.parse(JSON.stringify(item));
      this.itemdish.Num = 1;

      this.choiceTaboosState = !this.choiceTaboosState;
      this.maskState = !this.maskState;
    } else {
      if (item.FNames == "" && number == 1) {
        item.Num += 1;
      }
      this.updateNumberSubmit(item, number);
    }
  }
  maskClick() {
    this.maskState = false;
    this.choiceTaboosState = false;
    this.shoppingState = false;
  }
  shoppingClick() {
    this.shoppingState = !this.shoppingState;
    this.maskState = !this.maskState;
  }
  clearShopping() {
    this.shoppingList = [];
    this.shoppingState = false;
    this.maskState = false;

    this.sumPrice = 0.00;
    this.sumDishCount = 0;
    this.ngOnInit();
  }
  submit() {
    // let tempArray = [];
    // for (var key in this.dishMenu) {
    //   if (this.dishMenu.hasOwnProperty(key)) {
    //     var dishList = this.dishMenu[key];
    //     dishList.List.forEach(element => {
    //       if (element.Num > 0) {
    //         var index = tempArray.indexOf(element.Id);
    //         if (index == -1) {
    //           tempArray.push(element.Id);
    //         } else {
    //           element.Num = 0;
    //         }
    //       }
    //     });
    //   }
    // }


    this.ls.setObject("ask", {
      Ask: "",
      PeoPleNum: ""
    });
    console.log(this.shoppingList);

    //处理 菜品清单 分类
    this.ls.setObject("ls_dish", [{
      Count: this.sumDishCount,
      List: this.shoppingList,
      Name: "明细"
    }]);

    this.ls.setObject("ls_sumPrice", this.sumPrice);

    this.router.navigateByUrl("customer/orderInfo");
  }

}
