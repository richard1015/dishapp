/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PayRefundMgrComponent } from './payRefundMgr.component';

describe('PayRefundMgrComponent', () => {
  let component: PayRefundMgrComponent;
  let fixture: ComponentFixture<PayRefundMgrComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PayRefundMgrComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PayRefundMgrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
