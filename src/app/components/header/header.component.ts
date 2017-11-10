import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
declare var layer: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Input()
  leftShow: boolean = true;
  @Input()
  title: string = "title";
  @Input()
  right: string = "";
  //回掉函数
  @Output()
  rightEvent: EventEmitter<any> = new EventEmitter<any>();
  @Input()
  appClose = false;
  constructor() { }
  ngOnInit() {

  }

  back() {
    window.history.back();
    if (navigator.userAgent.indexOf('ydzh') != -1 && this.appClose) {
      try {
        var _window: any = window;
        _window.ydzh.close();
      } catch (error) {
        layer.msg(error.message);
      }
    }
  }
  rightClick() {
    this.rightEvent.emit();
  }
}
