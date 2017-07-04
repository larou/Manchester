import { NgModule } from '@angular/core';
import { IonicStorageModule } from '@ionic/storage';
import { AngularFireModule } from 'angularfire2';

import { CategoryService } from './categories';
import { NewsService } from './news';
import { LocationService } from './location';
import { VenueService } from './venues';
import { VoucherService } from './vouchers';
import { VoucherStorage } from './storage';
import { VoucherFactory } from './entities/voucher';
import { VenueFactory } from './entities/venue';

const firebaseConfig = require('../../config/firebase.js');

@NgModule({
  imports: [
    AngularFireModule.initializeApp(firebaseConfig),
    IonicStorageModule.forRoot({
      // FIXME: this is for development, production builds should use sqlite first for persistence
      driverOrder: ['indexeddb', 'sqlite', 'websql'],
    }),
  ],
  providers: [
    CategoryService,
    LocationService,
    NewsService,
    VenueFactory,
    VenueService,
    VoucherFactory,
    VoucherService,
    VoucherStorage,
  ],
})
export class DiscovrModule {}

export {
  CategoryService,
  LocationService,
  NewsService,
  VenueFactory,
  VenueService,
  VoucherFactory,
  VoucherService,
  VoucherStorage
};

export { ICategory, ISubCategory, INews, IVenue, IVoucher } from './entities';

declare var require: any;
