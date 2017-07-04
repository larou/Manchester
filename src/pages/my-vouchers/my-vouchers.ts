import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { IVoucher } from '../../discovr';
import { VoucherPage } from '../voucher/voucher';

@Component({
  selector: 'page-my-vouchers',
  templateUrl: 'my-vouchers.html'
})
export class MyVouchersPage {

  public vouchers: IVoucher[];

  constructor(
    private navCtrl: NavController,
    private navParams: NavParams,
  ) {
    this.vouchers = navParams.get('vouchers');
    console.debug('My Vouchers:', this.vouchers)
  }

  public voucherClick(voucher) {
    this.navCtrl.push(VoucherPage, {voucher});
  }
}
