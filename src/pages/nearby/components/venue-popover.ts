import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NavController, LoadingController, NavParams } from 'ionic-angular';

import { VenuePage } from '../../venue/venue';
import { IVenue } from '../../../discovr';

@Component({
  selector: 'venue-popover',
  templateUrl: 'venue-popover.html',
})
export class VenuePopover {
  @Input('venue') venue : IVenue;
  @Output() dismiss = new EventEmitter<void>();
  constructor(private loadingCtrl: LoadingController,
      private navCtrl: NavController, private navParams: NavParams) {
             
  }

  public goToVenuePage(venue : IVenue) {
    let loader = this.loadingCtrl.create({
      dismissOnPageChange: true,
    });
      loader.present();
      this.navCtrl.push(VenuePage, { venue: venue , location: venue.location});
      loader.dismiss()
    
  }

}
