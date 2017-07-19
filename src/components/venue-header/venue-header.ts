import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IVenue } from '../../discovr';

@Component({
  selector: 'venue-header',
  template: `
<h1 (click)="headerClick.emit(venue)">
  {{ venue?.name }}<br/>
  <small>{{ venue?.subtitle }}</small>
</h1>
  `,
})
export class VenueHeader {

  @Input() venue?: IVenue;
  @Output() headerClick = new EventEmitter<IVenue>();

}
