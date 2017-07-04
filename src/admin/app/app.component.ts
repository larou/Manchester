import { Component, OnInit } from '@angular/core';
import { LocationStrategy, PlatformLocation, Location } from '@angular/common';

declare var $: any;
declare var require: any;

@Component({
  selector: 'my-app',
  template: require('./app.component.html'),
})
export class AppComponent implements OnInit {
  location: Location;

  constructor(location: Location) {
    this.location = location;
  }

  ngOnInit() {
    require.ensure([], function (require) {
      require('../assets/js/initMenu');
    });
  }

  public isMaps(path) {
    var titlee = this.location.prepareExternalUrl(this.location.path());
    titlee = titlee.slice(1);
    if (path == titlee) {
      return false;
    }
    else {
      return true;
    }
  }
}
