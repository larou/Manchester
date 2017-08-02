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
  public days: string[]=['mon','tue','thu','wed','sat','sun'];
  
  public voucher: IVoucher={
   title:'',
   subtitle: '',
   description: '',
   venueId: '',
   disabled: false,
   availability: {
    days:[] ,
    startTime: '',
    endTime: '',
  },
   featured:false,
   priority: 0,
  } as IVoucher;
  private venue: IVenue= {
    location: {lat:0,lng:0},
    contacts: [
      {title: 'Call',details:''},
    ],
    social: [
      {title: 'Facebook',details:''},
      {title: 'Snapchat',details:''},
      {title: 'Instagram',details:''},
      {title: 'Message',details:''},
    ],
    photos: [],
    openingTimes :{
      "mon":{open: '',
             close: ''},
    "tue":{open: '',
             close: ''},
    "thu":{open: '',
             close: ''},
    "wed":{open: '',
             close: ''},
    "fri":{open: '',
             close: ''},
    "sat":{open: '',
             close: ''},
    "sun":{open: '',
             close: ''}

    }
    
  } as IVenue  ;
  constructor(
    private venueService: VenueService,
    private voucherService: VoucherService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
   
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
        this.voucher = voucher || this.voucher as IVoucher;
      });

     
  }

  public onSubmit(form: NgForm) {
    console.log('SUBMIT', form, form.valid, this.voucher);
    if (form.valid) {
      this.voucher.venueId = this.venue.$key;
      console.log('Voucher Mariem: ',this.voucher);
      this.voucherService.save(this.voucher)
        .then(() => {
          this.router.navigate(['venues']);
        })
        .catch((err) => console.log('Error saving', err));
    } else {
      console.log('Form invalid', form, this.voucher);
    }



    if (form.valid) {
      if(this.venue.photos)
          
      this.venueService.save(this.venue)
        .then(() => {
          this.router.navigate(['venues']);
        })
        .catch((err) => console.log('Error saving', err));
    } else {
      console.log('Form invalid', form);
    }

  }
 




}
