import { Component, OnInit } from '@angular/core';
import { WebSocketService } from './SERVICE/webSocket.service';
import { Subscription } from 'rxjs';
import { LocalStorage } from './SERVICE/local.storage';
declare var layer: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  subscripion: Subscription;
  isWatched: boolean = false;
  /**
   *
   */
  constructor( private wsService: WebSocketService,
    private ls:LocalStorage
  ) {
    
  }
  ngOnInit() {
    console.log("app on init ");
    //this.watchSocket();
    var _window: any = window;
    if (navigator.userAgent.indexOf('ydzh') != -1) {
      try {
        this.ls.setObject("USERINFO", { Guid: _window.ydzh.getGuid() });
      } catch (error) {
        layer.msg(error.message);
      }
    }
  }
  watchSocket() {
    if (this.subscripion) {
      this.subscripion.unsubscribe();
      this.isWatched = false;
      this.subscripion = null;
    } else {
      this.isWatched = true;
      this.subscripion = this.wsService.createObservableSocket("ws://192.168.1.56:8085").subscribe(
        res => {
          console.log(res);
        }
      );
    }
  }
}
