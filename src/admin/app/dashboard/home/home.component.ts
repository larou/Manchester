import { Component, OnInit, trigger, state, style, transition, animate } from '@angular/core';
const initDemo = require('../../../assets/js/charts.js');

declare var $: any;

@Component({
  selector: 'home-cmp',
  template: require('./home.component.html'),
})

export class HomeComponent implements OnInit {
  ngOnInit() {
    // $('[data-toggle="checkbox"]').each(function () {
    //     if($(this).data('toggle') == 'switch') return;
    //
    //     var $checkbox = $(this);
    //     $checkbox.checkbox();
    // });
    initDemo();
  }
}
