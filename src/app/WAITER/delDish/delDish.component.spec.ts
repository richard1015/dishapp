/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { DelDishComponent } from './delDish.component';

describe('DelDishComponent', () => {
  let component: DelDishComponent;
  let fixture: ComponentFixture<DelDishComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DelDishComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DelDishComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
