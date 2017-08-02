import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Day } from '../../utils';
import { IRawVoucher, IVenue, IVoucher, IAvalability} from './index';
import { VenueService } from '../venues';
import { VoucherStorage } from '../storage';

@Injectable()
export class VoucherFactory {

  constructor(
    private venueService: VenueService,
    private voucherStorage: VoucherStorage,
  ) {}

  public fromRaw(voucher: IRawVoucher): IVoucher;
  public fromRaw(voucher: IRawVoucher[]): IVoucher[];
  public fromRaw(voucher: IRawVoucher|IRawVoucher[]): IVoucher|IVoucher[] {
    if (Array.isArray(voucher)) {
      return voucher.map(voucher => this.fromRaw(voucher));
    }
    return new Voucher(voucher, this.venueService, this.voucherStorage);
  }
}

export class Voucher implements IVoucher {

  public $key: string;
  public title: string;
  public subtitle: string;
  public description: string;
  public venueId: string;
  public disabled: boolean;
  public availability: {
    days: string[];
    startTime: string;
    endTime: string;
    
} ;
  public featured: boolean;
  public priority: number;
  public venue: Observable<IVenue>;

  constructor(fromFirebase,
              private venueService: VenueService,
              private voucherStorage: VoucherStorage,
              ) {
    (<any>Object).assign(this, fromFirebase);
    this.$key = fromFirebase.$key;
    this.venue = this.venueService.getById(this.venueId);
  }

  public toggleStorage() {
    return this.voucherStorage.toggleStorage(this);
  }

  public get available() {
    return true;
  }

  public toJSON() {
    return this.toRaw();
  }

  public toRaw() {
    return {
      $key: this.$key,
      title: this.title,
      subtitle: this.subtitle,
      description: this.description,
      venueId: this.venueId,
      disabled: this.disabled,
      availability: this.availability,
      featured: this.featured,
      priority: this.priority,
    };
  }
}
