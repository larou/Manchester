import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { IVenue, IVoucher, VenueService, VoucherService } from '../../../../discovr';
import { Observable } from 'rxjs/Observable';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'table-cmp',
  template: require('./voucher.form.component.html'),
})
export class VoucherFormComponent implements OnInit {

  public voucher: IVoucher;
  private venue: IVenue;

  constructor(
    private venueService: VenueService,
    private voucherService: VoucherService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    console.log('here');
  }

  public ngOnInit() {
    this.route.params
      .switchMap((params) => {
        const observables: Observable<IVoucher|IVenue>[] = [this.venueService.getById(params.venueId)];
        if (params.voucherId !== undefined) {
          observables.push(this.voucherService.getById(params.voucherId));
        }
        return Observable.combineLatest(...observables);
      })
      .subscribe(([venue, voucher]: [IVenue, IVoucher]) => {
        console.log('Voucher form init', venue, voucher);
        this.venue = venue;
        this.voucher = voucher || {} as IVoucher;
      });
  }

  public onSubmit(form: NgForm) {
    console.log('SUBMIT', form, form.valid, this.voucher);
    if (form.valid) {
      this.voucher.venueId = this.venue.$key;
      this.voucherService.save(this.voucher)
        .then(() => {
          this.router.navigate(['venues']);
        })
        .catch((err) => console.log('Error saving', err));
    } else {
      console.log('Form invalid', form, this.voucher);
    }
  }

}
