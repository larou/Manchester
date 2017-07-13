import { Component, Input, EventEmitter, Output } from '@angular/core';

import { IVenue } from '../../discovr';

@Component({
  selector: 'venue-slides',
  templateUrl: 'venue-slides.html',
})
export class VenueSlides {

  @Input() venues: IVenue[];
  @Output() venueClick = new EventEmitter<IVenue>();

}
