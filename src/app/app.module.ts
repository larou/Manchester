import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { IonicStorageModule } from '@ionic/storage';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { MyApp } from './app.component';

import { CategoryPage } from '../pages/category/category';
import { ExplorePage } from '../pages/explore/explore';
import { HomePage } from '../pages/home/home';
import { MyVouchersPage } from '../pages/my-vouchers/my-vouchers';
import { NearbyPage } from '../pages/nearby/nearby';
import { RadioPage } from '../pages/radio/radio';
import { VenuePage } from '../pages/venue/venue';
import { VoucherPage } from '../pages/voucher/voucher';

import { VenueHeader } from '../components/venue-header/venue-header';
import { VenueSlides } from '../components/venue-slides/venue-slides';
import { VoucherList } from '../components/voucher-list/voucher-list';
import { VoucherSlides } from '../components/voucher-slides/voucher-slides';
import { VenueDetails } from '../pages/venue/components/details/venue-details';

import { VenueContactDetails } from '../pages/venue/components/details/components/venue-contact-details';
import { VenuePhotos } from '../pages/venue/components/details/components/venue-photos';
import { VenueOpeningTimes } from '../pages/venue/components/details/components/venue-opening-times';
import { GooglemapComponent } from '../pages/nearby/components/googlemap';
import { VenuePopover } from '../pages/nearby/components/venue-popover';
import { DiscovrModule } from '../discovr';


@NgModule({
  declarations: [
    MyApp,
    CategoryPage,
    ExplorePage,
    HomePage,
    MyVouchersPage,
    NearbyPage,
    RadioPage,
    VenuePage,
    GooglemapComponent,
    VenueContactDetails,
    VenueDetails,
    VenueHeader,
    VenueOpeningTimes,
    VenuePhotos,
    VenuePopover,
    VenueSlides,
    VoucherList,
    VoucherPage,
    VoucherSlides,
  
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot({
      // FIXME: this is for development, production builds should use sqlite first for persistence
      driverOrder: ['indexeddb', 'sqlite', 'websql'],
    }),
    DiscovrModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    CategoryPage,
    ExplorePage,
    HomePage,
    MyVouchersPage,
    NearbyPage,
    RadioPage,
    VenuePage,
    VoucherPage,
    VenuePopover
  ],
  providers: [
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Geolocation,
    StatusBar,
    SplashScreen,
    InAppBrowser
  ],
})
export class AppModule {}
