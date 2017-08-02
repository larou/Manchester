import { Component, Input, EventEmitter, Output } from '@angular/core';

import { IVoucher } from '../../discovr';
import { VoucherPage } from '../../pages/voucher/voucher'
import { NavController, NavParams } from 'ionic-angular';


@Component({
  selector: 'voucher-slides',
  templateUrl: 'voucher-slides.html',
})
export class VoucherSlides {

  @Input() vouchers: IVoucher[];
  @Output() voucherClick = new EventEmitter<IVoucher>();
  public voucher: IVoucher;
  constructor(private navCtrl: NavController){

  }

  clickVoucher(voucher){
    this.navCtrl.push(VoucherPage, { voucher:voucher });
  }
}