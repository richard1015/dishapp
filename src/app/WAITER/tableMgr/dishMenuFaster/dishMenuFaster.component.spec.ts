/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { DishMenuFasterComponent } from './dishMenuFaster.component';

describe('DishMenuFasterComponent', () => {
  let component: DishMenuFasterComponent;
  let fixture: ComponentFixture<DishMenuFasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DishMenuFasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DishMenuFasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
