import { Component, Input } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';


@Component({
  selector: 'venue-contact-details',
  templateUrl: 'venue-contact-details.html'
})
export class VenueContactDetails {
  @Input() contacts;
  public location: any ;
  public query : string;
  public lat : any;
  public long: any;
  public encodedQuery: string;
  constructor(
    private navCtrl: NavController,
    private navParams: NavParams) {
    
    this.location = this.navParams.get('location')
    this.lat = this.location.lat;
    this.long = this.location.lng
    this.query = this.lat + "," + this.long
    this.encodedQuery = encodeURI(this.query)
    

  }
}
