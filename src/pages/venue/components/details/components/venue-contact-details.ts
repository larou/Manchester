import { Component, Input } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';


@Component({
  selector: 'venue-contact-details',
  templateUrl: 'venue-contact-details.html'
})
export class VenueContactDetails {
  @Input() contacts;
  public location: any ;
  lat : any;
  lng : any;
  constructor(
    private navCtrl: NavController,
    private navParams: NavParams) {
    
    this.location = this.navParams.get('location')
    this.lat = this.location.lat;
    this.lng = this.location.lng;  
  }

  navigate() {
    window.open("https://www.google.com/maps/search/?api=1&query=" +this.lat+","+this.lng);
  }
}
