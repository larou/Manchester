import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { Observable } from 'rxjs';

import { MyVouchersPage } from '../my-vouchers/my-vouchers';
import { NearbyPage } from '../nearby/nearby';
import { RadioPage } from '../radio/radio';
import { VoucherPage } from '../voucher/voucher';

import { INews, IVoucher, NewsService, VoucherService } from '../../discovr';
import { ExplorePage } from '../explore/explore';
import { ViewChild } from '@angular/core';
import { Slides } from 'ionic-angular';

const NUM_FEATURED_VOUCHERS = 6;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
   @ViewChild(Slides) slides: Slides;

  goToSlide() {
    this.slides.slideTo(2, 500);
  }
   slideChanged() {
    let currentIndex = this.slides.getActiveIndex();
    console.log('Current index is', currentIndex);
  }

  public latestNews: Observable<INews[]>;
  public hotVouchers: Observable<IVoucher[]>;

  constructor(private navCtrl: NavController,
              private voucherService: VoucherService,
              private loadingCtrl: LoadingController,
              newsService: NewsService,
  ) {
    this.latestNews = newsService.get();
    this.hotVouchers = voucherService.getFeatured(NUM_FEATURED_VOUCHERS);
  }

  goToExplorePage() {
    this.navCtrl.push(ExplorePage, {category: ''});
  }

  goToNearbyPage() {
    this.navCtrl.push(NearbyPage);
  }

  goToRadioPage() {
    this.navCtrl.push(RadioPage);
  }

  goToDailyVoucherPage() {
    this.loadingCtrl.create({
      dismissOnPageChange: true,
    }).present();
    this.voucherService.getDailyVoucher()
      .subscribe((voucher) => {
        this.navCtrl.push(VoucherPage, {voucher});
      });
  }

  goToMyVouchersPage() {
    this.loadingCtrl.create({
      dismissOnPageChange: true,
    }).present();
    this.voucherService.getAllFromStorage()
      .subscribe((vouchers) => this.navCtrl.push(MyVouchersPage, {vouchers}));
  }

  clickVoucher(voucher) {
    this.navCtrl.push(VoucherPage, {voucher});
  }
}
