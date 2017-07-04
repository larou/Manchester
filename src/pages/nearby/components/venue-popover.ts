import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';

import { VenuePage } from '../../venue/venue';
import { IVenue } from '../../../discovr';

@Component({
  selector: 'venue-popover',
  templateUrl: 'venue-popover.html',
})
export class VenuePopover {

  @Input() venue: IVenue;
  @Output() dismiss = new EventEmitter<void>();

  constructor(private loadingCtrl: LoadingController,
              private navCtrl: NavController) {
  }

  public goToVenuePage(venue: IVenue) {
    this.loadingCtrl.create({
      dismissOnPageChange: true,
    }).present();
    this.navCtrl.push(VenuePage, {venue});
  }

}
