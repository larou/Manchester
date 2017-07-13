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
  public availableVouchers: IVoucher[];
  public otherVouchers: IVoucher[];

  constructor(
    private navCtrl: NavController,
    private navParams: NavParams,
    private voucherService: VoucherService,
  ) {
    this.venue = navParams.get('venue');
    console.debug('Venue page', this.venue);
  }

  public ngOnInit() {
    this.voucherService.getByVenue(this.venue)
      .subscribe(vouchers => {
        this.availableVouchers = vouchers.filter(voucher => voucher.available);
        this.otherVouchers = vouchers.filter(voucher => !voucher.available);
      });
  }

  public voucherClick(voucher) {
    voucher.venue = this.venue;
    this.navCtrl.push(VoucherPage, {voucher});
  }
}
