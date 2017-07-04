import { Component, OnInit } from '@angular/core';
import { ROUTES } from './sidebar-routes.config';

declare var $: any;
declare var require: any;

@Component({
  selector: 'sidebar-cmp',
  template: require('./sidebar.component.html'),
})
export class SidebarComponent implements OnInit {
  public menuItems: any[];

  ngOnInit() {
    require.ensure([], function (require) {
      require('../../assets/js/sidebar-moving-tab.js');
    });
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
}
