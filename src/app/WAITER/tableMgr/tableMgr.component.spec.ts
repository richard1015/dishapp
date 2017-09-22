/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TableMgrComponent } from './tableMgr.component';

describe('TableMgrComponent', () => {
  let component: TableMgrComponent;
  let fixture: ComponentFixture<TableMgrComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableMgrComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableMgrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
