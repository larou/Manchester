import { Component, ChangeDetectorRef } from '@angular/core';
import { IVenue } from '../../discovr';
import { NavController, NavParams } from 'ionic-angular';
import { VenuePopover } from './components/venue-popover'

@Component({
  selector: 'page-nearby',
  templateUrl: 'nearby.html',
})
export class NearbyPage {

  public selectedVenue: IVenue;

  constructor(private cd: ChangeDetectorRef,private navCtrl: NavController,
    private navParams: NavParams) {
 
    }

  public markerClick(venue: IVenue) {
    this.selectedVenue = venue;
    console.log(this.selectedVenue)
    
    this.cd.detectChanges();
    console.debug('Venue selected', this.selectedVenue);
    
  }

  public dismissPopover() {
    this.selectedVenue = null;
  }
}
