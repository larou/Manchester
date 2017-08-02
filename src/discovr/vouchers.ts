import { Observable } from 'rxjs';
import { AngularFire } from 'angularfire2';
import { Injectable } from '@angular/core';
import * as shortid from 'shortid';
import { IStore } from './store';
import { IVoucher, IVenue, IRawVoucher } from './entities';
import { Voucher, VoucherFactory } from './entities/voucher';
import { VoucherStorage } from './storage';

@Injectable()
export class VoucherService implements IStore<IVoucher> {
  allVouchers: any;
   all : any;
  constructor(
    private af: AngularFire,
    private voucherStorage: VoucherStorage,
    private voucherFactory: VoucherFactory,
  ) {
  }

  public getAllVouchers()  {
        
      return this.af.database.list('/vouchers') 
       .map(voucher => this.voucherFactory.fromRaw(voucher));
   

   
  }
  public getFeatured(limit: number) {
    return this.af.database.list('/vouchers', {
      query: {
        orderByChild: 'featured',
        equalTo: true,
      },
    })
      .map((vouchers: IRawVoucher[]) => {

        return this.voucherFactory.fromRaw(vouchers)
          .filter(voucher => voucher.available)
          .filter(voucher => !voucher.disabled)
          .sort((a, b) => b.priority - a.priority)
          .slice(0, limit)

      });

  }

  public getById(id: string): Observable<IVoucher> {
    return this.af.database.object(`/vouchers/${id}`)
      .map(voucher => this.voucherFactory.fromRaw(voucher));
  }

  /**
   * Create or update the voucher in the database.
   * @returns {firebase.Promise<any>|firebase.Thenable<any>}
   */
  public save(voucher:  IRawVoucher | IVoucher ) {
    if (voucher instanceof Voucher) {
      voucher = voucher.toRaw();
    }
    const oldKey = voucher.$key;
    const newKey = shortid.generate();
    if (!oldKey || oldKey.slice(0, newKey.length) !== newKey) {
      voucher.$key = `${newKey}`;
    }
    //voucher.updatedAt = moment().toISOString();
   // if (voucher.createdAt === undefined) {
     // voucher.createdAt = moment().toISOString();
    //}
    const clone = (<any>Object).assign({}, voucher);
    delete clone.$key;
    console.log('Saving vouchers', voucher);
    return this.af.database.object(`/vouchers/${voucher.$key}`)
      .update(clone)
      .then(() => {
        if (oldKey && voucher.$key !== oldKey) {
          console.log('Deleting old record', oldKey);
          return this.af.database.object(`/vouchers/${oldKey}`).remove();
        }
      });
  }

  public destroy(voucher: IVoucher): firebase.Promise<void> {
    return this.af.database.object(`/vouchers/${voucher.$key}`)
      .remove();
  }

  public getByVenue(venue: IVenue | string): Observable<IVoucher[]> {
    if (typeof venue !== 'string') {
      return this.getByVenue(venue.$key);
    }
    return this.af.database.list('/vouchers', {
      query: {
        orderByChild: 'venueId',
        equalTo: venue,
      }
    })
      .map((vouchers: IRawVoucher[]) => this.voucherFactory.fromRaw(vouchers));
  }

  public getByCategory(category: string): Observable<IVoucher[]> {
    return this.af.database.list('/vouchers', {
      query: {
        orderByChild: 'venueId',
        startAt: category,
        endAt: category + '~',
      }
    })
      .map((vouchers: IRawVoucher[]) => this.voucherFactory.fromRaw(vouchers));
  }

  public getDailyVoucher(): Observable<IVoucher> {
    return this.af.database
      .list(`/vouchers`, {
        query: {
          orderByChild: 'featured',
          equalTo: true,
        }
      })
      .flatMap((vouchers) => {
        return Observable.from(vouchers.sort((a, b) => b.priority - a.priority));
      })
      .map((voucher: IRawVoucher) => this.voucherFactory.fromRaw(voucher))
      .filter(voucher => voucher.available)
      .first(voucher => !voucher.disabled)
      .do(voucher => console.log('Daily Voucher: ', voucher));
  }

  public getAllFromStorage(): Observable<IVoucher[]> {
    return Observable.fromPromise(this.voucherStorage.getAllFromStorage())
      .map((vouchers: IRawVoucher[]) => this.voucherFactory.fromRaw(vouchers));
  }

}
