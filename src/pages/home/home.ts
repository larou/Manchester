import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { Observable } from 'rxjs';
import { InAppBrowser } from '@ionic-native/in-app-browser';

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
  @ViewChild(Content) content: Content;
  loader : any
  myDate: String = new Date().toDateString()
  endTime: any
  startTime:any
  remaining: any
  time: any ;
  myCurrentTime: any =new Date().getHours()
  b:boolean;
  public MyHotVoucher: any[] = [];
  public latestNews: Observable<INews[]>;
  public hotVouchers: Observable<IVoucher[]>;
  constructor(private navCtrl: NavController,
              private voucherService: VoucherService,
              private loadingCtrl: LoadingController,
                      newsService: NewsService,
              private iab: InAppBrowser
  ) {
    this.latestNews = newsService.get();
    console.log('latestNews:',this.latestNews);
    this.hotVouchers = this.voucherService.getFeatured(NUM_FEATURED_VOUCHERS)
    this.hotVouchers.subscribe(users => {
      for (let i = 0; i < users.length; i++) {
        let obj = users[i]
        this.MyHotVoucher.push(obj)

      }
      this.MyHotVoucher = this.shuffleArray(this.MyHotVoucher)
    });

    this.voucherService.getDailyVoucher()
      .subscribe((voucher) => {
        this.endTime = voucher.availability.endTime;
        this.endTime = parseInt(this.endTime.split(":")[0]);
        this.startTime=voucher.availability.startTime;
        this.startTime=parseInt(this.startTime.split(":")[0]);
        this.myCurrentTime= parseInt(this.myCurrentTime);

        if(this.startTime>this.endTime){
          if ((this.myCurrentTime<this.startTime)&&(this.myCurrentTime>this.endTime))
          {
                    this.remaining='closed';
                    this.b=false;
          }
          else{  
                 
                 this.remaining =  24 -this.myCurrentTime+ this.endTime;
                 this.b=true;
          }
        }
        else{
        if((this.myCurrentTime>=this.endTime) || (this.myCurrentTime < this.startTime))
        {
          this.remaining='closed';
          this.b=false;
        }
        else{
          this.remaining = this.endTime - this.myCurrentTime
          this.b=true;
        }
        }
          console.log(this.remaining);

      });


      
  }
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

  NewsBrowser(url:string){
     
     const browser = this.iab.create(url,'_self');

  }

  clickVoucher($event,voucher) {
    this.navCtrl.push(VoucherPage, {voucher:voucher} );
  }
}