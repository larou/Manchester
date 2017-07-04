import { Component, ChangeDetectorRef } from '@angular/core';
import { IVenue } from '../../discovr';

@Component({
  selector: 'page-nearby',
  templateUrl: 'nearby.html',
})
export class NearbyPage {

  public selectedVenue: IVenue;

  constructor(private cd: ChangeDetectorRef) {}

  public markerClick(venue: IVenue) {
    this.selectedVenue = venue;
    this.cd.detectChanges();
    console.debug('Venue selected', this.selectedVenue);
  }

  public dismissPopover() {
    this.selectedVenue = null;
  }
}
