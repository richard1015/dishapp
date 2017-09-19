import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-module',
  templateUrl: './module.component.html',
  styleUrls: ['./module.component.css']
})
export class ModuleComponent implements OnInit {

  constructor() { }
  @Input()
  index = 0;

  iconArray = [
    { id: 1, name: "点餐", icon: "url('/assets/imgs/diancan.png')" },
    { id: 2, name: "买单", icon: "url('/assets/imgs/maidan.png')" }
  ];

  item: any = {};
  ngOnInit() {
    this.item = this.iconArray.find(i => this.index == i.id);
  }

}
