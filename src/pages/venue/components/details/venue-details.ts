import { Component, Input ,Directive, HostListener, ElementRef,Injectable} from '@angular/core';
import { NavController } from 'ionic-angular';

import { IVenue } from '../../../../discovr';

@Component({
  selector: 'venue-details', 
  templateUrl: 'venue-details.html'
  
})  


export class VenueDetails {

  @Input() venue: IVenue;
  public expand = {
    bio: false,
    contact: true,
    photos: false,
    social: false,
    opening: false,
  };
  constructor(public navCtrl: NavController) {} 
}

