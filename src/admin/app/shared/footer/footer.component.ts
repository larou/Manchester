import { Component, HostBinding } from '@angular/core';

@Component({
  selector: 'footer-cmp',
  template: require('./footer.component.html'),
})

export class FooterComponent {
  test: Date = new Date();
}
