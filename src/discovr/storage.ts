import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

import { IVoucher } from './entities';

@Injectable()
export class VoucherStorage {

  private keysInStorage = new Set();

  constructor(
    private storage: Storage,
  ) {
    storage.ready().then(() => storage.keys())
      .then((keys: string[]) => {
        for (const key in keys) {
          this.keysInStorage.add(key);
          console.debug('Key in storage!', key);
        }
      });
  }

  public getAllFromStorage(): Promise<IVoucher[]> {
    const myVouchers: IVoucher[] = [];
    return this.storage.ready()
      .then(() => {
        return this.storage.forEach((json: string, key: string) => {
          this.keysInStorage.add(key);
          const voucher = JSON.parse(json);
          voucher.$key = key;
          myVouchers.push(voucher);
        });
      })
      .then(() => myVouchers);
  }

  public addToStorage(voucher: IVoucher): Promise<IVoucher> {
    console.debug('add to storage!', voucher.$key);
    return this.storage.ready()
      .then(() => this.storage.set(voucher.$key, JSON.stringify(voucher)))
      .then(() => {
        console.debug('added to storage!', voucher.$key);
        this.keysInStorage.add(voucher.$key);
        return voucher
      })
      .catch((err) => console.error(err));
  }

  public removeFromStorage(voucher: IVoucher): Promise<IVoucher> {
    console.debug('remove from storage!', voucher.$key);
    return this.storage.ready()
      .then(() => this.storage.remove(voucher.$key))
      .then(() => {
        console.debug('removed from storage!', voucher.$key);
        this.keysInStorage.delete(voucher.$key);
        return voucher
      })
      .catch((err) => console.error(err));
  }

  public isInStorage(voucher: IVoucher): boolean {
    return this.keysInStorage.has(voucher.$key);
  }

  public toggleStorage(voucher: IVoucher): Promise<boolean> {
    return this.isInStorage(voucher)
      ? this.removeFromStorage(voucher).then(() => false)
      : this.addToStorage(voucher).then(() => true);
  }
}
