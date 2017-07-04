import { Component, Input, EventEmitter, Output } from '@angular/core';

import { IVoucher } from '../../discovr';

@Component({
  selector: 'voucher-slides',
  templateUrl: 'voucher-slides.html',
})
export class VoucherSlides {

  @Input() vouchers: IVoucher[];
  @Output() voucherClick = new EventEmitter<IVoucher>();

}