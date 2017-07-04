import { Component, Input } from '@angular/core';

@Component({
  selector: 'venue-contact-details',
  templateUrl: 'venue-contact-details.html'
})
export class VenueContactDetails {
  @Input() contacts;
}
