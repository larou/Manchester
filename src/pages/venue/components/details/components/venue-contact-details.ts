import { Component, Input } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';


@Component({
  selector: 'venue-contact-details',
  templateUrl: 'venue-contact-details.html'
})
export class VenueContactDetails {
  @Input() contacts;
  public location: any ;
  lat : any;
  lng : any;
  url:string;
  constructor(
    private navCtrl: NavController,
    private navParams: NavParams,
    private iab: InAppBrowser) {
    
    this.location = this.navParams.get('location')
    this.lat = this.location.lat;
    this.lng = this.location.lng;  
  }

  navigate() {

    this.url= "https://www.google.com/maps/search/?api=1&query="+this.lat+","+this.lng;
    const browser = this.iab.create(this.url,'_self');
    //window.open("https://www.google.com/maps/search/?api=1&query=" +this.lat+","+this.lng);
  }
}
