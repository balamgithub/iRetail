import { Component, AfterViewInit } from '@angular/core';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
import { LayoutService } from '../../service/layout.service';
import { Router } from '@angular/router';

@Component({
  moduleId: 'LayoutComponent',
  selector: 'layout',
  templateUrl: 'layout.page.html',
  styleUrls: ['layout.page.css'],
  animations: [
    trigger('slideInOut', [
      state(
        'in',
        style({
          transform: 'translate3d(-100%, 0, 0)',
        })
      ),
      state(
        'out',
        style({
          transform: 'translate3d(0, 0, 0)',
        })
      ),
      transition('in => out', animate('200ms ease-in-out')),
      transition('out => in', animate('200ms ease-in-out')),
    ]),
  ],
})
export class LayoutComponent implements AfterViewInit {
  showSideBar = true;
  menus: any;
  activeURL: any;
  viewFotterClass = 'page-content-wrapper';
  mainViewClass = 'page-container';
  menuColors: any = [
    'txt-indigo',
    'txt-orange',
    'txt-green',
    'txt-themeRed',
    'txt-warm',
    'txt-info',
    'txt-brown',
    'txt-green',
  ];
  constructor(private _route: Router) {
    this.setMenu();
  }

  ngAfterViewInit() {
    this._route.navigate(['dashboard']);
  }

  setMenu() {

  }

  setMenusArray() {

  }
}
