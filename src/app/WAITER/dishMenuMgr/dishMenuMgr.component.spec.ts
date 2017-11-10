/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { DishMenuMgrComponent } from './dishMenuMgr.component';

describe('DishMenuMgrComponent', () => {
  let component: DishMenuMgrComponent;
  let fixture: ComponentFixture<DishMenuMgrComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DishMenuMgrComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DishMenuMgrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
