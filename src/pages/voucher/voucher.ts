import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { IVoucher, VoucherStorage } from '../../discovr';
import { VenuePage } from '../venue/venue';

@Component({
  selector: 'page-voucher',
  templateUrl: 'voucher.html',
})
export class VoucherPage {

  public voucher: IVoucher;
  public saveBtnIcon: string;

  constructor(
    private navCtrl: NavController,
    private navParams: NavParams,
    private voucherStorage: VoucherStorage,
  ) {
    this.voucher = navParams.get('voucher');
    this.voucherStorage.isInStorage(this.voucher)
      ? this.saveBtnIcon = 'remove'
      : this.saveBtnIcon = 'add';
  }

  public clickSaveBtn(): void {
    this.voucher.toggleStorage()
      .then(added => {
        added ? this.saveBtnIcon = 'remove' : this.saveBtnIcon = 'add';
      });
  }

  public venueClick(venue): void {
    this.navCtrl.push(VenuePage, {venue});
  }
}
