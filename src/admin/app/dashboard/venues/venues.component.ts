import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { IVenue, IVoucher, VenueService, VoucherService } from '../../../../discovr';

@Component({
  selector: 'table-cmp',
  template: require('./venues.component.html'),
})
export class VenuesComponent {

  public venues: Observable<IVenue[]>;
  public vouchers: Observable<IVoucher[]>;
  public selectedVenue: IVenue;

  constructor(
    private venueService: VenueService,
    private voucherService: VoucherService,
  ) {
    this.venues = venueService.getAll();
  }

  public selectVenue(venue: IVenue) {
    if (this.selectedVenue === undefined) {
      this.selectedVenue = venue;
      this.vouchers = this.voucherService.getByVenue(venue);
    } else {
      this.selectedVenue = undefined;
      this.vouchers = undefined;
    }
  }

  public destroyVenue(venue: IVenue) {
    return this.venueService.destroy(venue);
  }

  public destroyVoucher(voucher: IVoucher) {
    return this.voucherService.destroy(voucher);
  }

}
