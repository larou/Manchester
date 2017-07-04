import { Component, Input } from '@angular/core';

@Component({
  selector: 'venue-photos',
  templateUrl: 'venue-photos.html'
})
export class VenuePhotos {
  @Input() photos;
}
