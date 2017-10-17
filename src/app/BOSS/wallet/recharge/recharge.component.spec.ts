/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { RechargeComponent } from './recharge.component';

describe('RechargeComponent', () => {
  let component: RechargeComponent;
  let fixture: ComponentFixture<RechargeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RechargeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RechargeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
