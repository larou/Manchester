import { Component, Input, EventEmitter, Output } from '@angular/core';

import { IVoucher, VoucherStorage } from '../../discovr';

@Component({
  selector: 'voucher-list',
  templateUrl: 'voucher-list.html',
})
export class VoucherList {

  @Input() vouchers: IVoucher[];
  @Output() voucherClick = new EventEmitter<IVoucher>();

  constructor(public voucherStorage: VoucherStorage) {}

  public clickVoucher(voucher: IVoucher): void {
    this.voucherClick.emit(voucher);
  }

  public isInStorage(voucher): boolean {
    return this.voucherStorage.isInStorage(voucher);
  }

  public clickSaveBtn(voucher): void {
    voucher.toggleStorage();
  }

}
