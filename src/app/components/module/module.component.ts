import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-module',
  templateUrl: './module.component.html',
  styleUrls: ['./module.component.css']
})
export class ModuleComponent implements OnInit {

  constructor(private routerInfo: ActivatedRoute,
    private router: Router) { }
  @Input()
  name = "";
  @Input()
  imgUrl = "";
  @Input()
  linkUrl = "";

  ngOnInit() {

  }
  clickUrl() {
    if (this.linkUrl) {
      this.router.navigateByUrl(this.linkUrl);
    }
  }
}
