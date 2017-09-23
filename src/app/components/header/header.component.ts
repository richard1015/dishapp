import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Input()
  title: string = "title";
  @Input()
  right: string = "";
  //回掉函数
  @Output()
  rightEvent: EventEmitter<any> = new EventEmitter<any>();
  constructor() { }

  ngOnInit() {
  }
  back() {
    window.history.back();
  }
  rightClick(){
    this.rightEvent.emit();
  }
}
