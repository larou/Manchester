import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { IVenue, IVoucher, VoucherService } from '../../discovr';
import { VoucherPage } from '../voucher/voucher';

@Component({
  selector: 'page-venue',
  templateUrl: 'venue.html',
})
export class VenuePage implements OnInit {

  public segment: string = 'details';
  public venue: IVenue;
  public location: any;
  public availableVouchers: IVoucher[];
  public otherVouchers: IVoucher[];
  public check: boolean ;
  public arr : any ;
  Places : Array<any> ;
  constructor(
    private navCtrl: NavController,
    private navParams: NavParams,
    private voucherService: VoucherService,
  ) {
    this.venue = navParams.get('venue');
    console.log('Venue page', this.venue);
    this.location = navParams.get('location')
    this.Places = navParams.get('places');
    
  }
  public ngOnInit() {
    this.voucherService.getByVenue(this.venue)
      .subscribe(vouchers => {
       // console.log(vouchers)
        this.availableVouchers = vouchers.filter(voucher => voucher.available);
        //console.log(this.availableVouchers)
        this.otherVouchers = vouchers.filter(voucher => !voucher.available);
      });
  }

  public voucherClick(voucher) {
   // voucher.venue = this.venue;
    this.navCtrl.push(VoucherPage, { voucher : voucher });
  }
   public clickVenue(venue) {
    this.navCtrl.push(VenuePage, {venue: venue , location: venue.location , places : this.Places});
    
  }
}
