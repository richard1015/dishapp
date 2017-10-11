import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../SERVICE/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalStorage } from '../../SERVICE/local.storage';

@Component({
  selector: 'app-taboos',
  templateUrl: './taboos.component.html',
  styleUrls: ['./taboos.component.css']
})
export class TaboosComponent implements OnInit {

  constructor(private api: ApiService,
    private routerInfo: ActivatedRoute,
    private router: Router,
    private ls: LocalStorage) { }
  dishMenu = [];
  ngOnInit() {
    this.dishMenu = this.ls.getObject("ls_dish");
  }
  checkDishList(list: [any]) {
    for (var key in list) {
      if (list.hasOwnProperty(key)) {
        var element = list[key];

        if (element.Num > 0) {
          return false;
        }
      }
    }
    return true;
  }
  choiceDishtaboos(itemdish, idx) {
    if (!itemdish.checkName) itemdish.checkName = [];

    let fname = itemdish.FNames.split(',')[idx];
    let index = itemdish.checkName.findIndex(item => item == fname);
    if (index == -1)
      itemdish.checkName.push(fname);
    else
      itemdish.checkName.splice(index, 1);
  }

  checkActive(lable, itemdish, idx) {
    if (itemdish.checkName) {
      if (itemdish.checkName.indexOf(lable) != -1) {
        return true;
      }
    }
    return false;
  }

  submit(item) {
    this.ls.setObject("ls_dish", this.dishMenu);
    window.history.back();
  }
}
