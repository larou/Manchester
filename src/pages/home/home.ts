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
import { Slides, Content } from 'ionic-angular';

const NUM_FEATURED_VOUCHERS = 10;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  @ViewChild(Slides) slides: Slides;
<<<<<<< HEAD
  @ViewChild(Content) content: Content;
  loader : any
  myDate: String = new Date().toDateString()
=======
  loader : any
  myDate: String = new Date().toDateString();
>>>>>>> 6e8eb7aa704d028f94ce112b4df0e04f04df2262
  endTime: any
  remaining: any
  myCurrentTime: any = new Date().getHours()
  public MyHotVoucher: any[] = [];
  public latestNews: Observable<INews[]>;
  public hotVouchers: Observable<IVoucher[]>;
  constructor(private navCtrl: NavController,
    private voucherService: VoucherService,
    private loadingCtrl: LoadingController,
    newsService: NewsService,
  ) {
    this.latestNews = newsService.get();
    this.hotVouchers = this.voucherService.getFeatured(NUM_FEATURED_VOUCHERS)
    this.hotVouchers.subscribe(users => {
      for (let i = 0; i < users.length; i++) {
        let obj = users[i]
        this.MyHotVoucher.push(obj['title'])

      }
      this.MyHotVoucher = this.shuffleArray(this.MyHotVoucher)
    });

    this.voucherService.getDailyVoucher()
      .subscribe((voucher) => {
        this.endTime = voucher.availability.endTime;
        this.endTime = this.endTime.split(":")[0]
        // console.log(this.timer.split(":")[0])

        this.remaining = this.endTime - this.myCurrentTime
          console.log(this.remaining)

      });
      
  }
<<<<<<< HEAD
=======
 
  
>>>>>>> 6e8eb7aa704d028f94ce112b4df0e04f04df2262
  shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  }
  goToSlide() {
    this.slides.slideTo(2, 500);
  }

  slideChanged() {
    let currentIndex = this.slides.getActiveIndex();
    console.log('Current index is', currentIndex);
  }

  goToExplorePage() {
    this.navCtrl.push(ExplorePage, { category: '' });
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
        this.navCtrl.push(VoucherPage, { voucher });

      });
  }

  goToMyVouchersPage() {
    this.loadingCtrl.create({
      dismissOnPageChange: true,
    }).present();
    this.voucherService.getAllFromStorage()
      .subscribe((vouchers) => this.navCtrl.push(MyVouchersPage, { vouchers }));
  }

  clickVoucher(voucher) {
    this.navCtrl.push(VoucherPage, { voucher });
  }
}
