import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { CategoryPage } from '../category/category';
import { ICategory, IVoucher, CategoryService, VoucherService } from '../../discovr';
import { VoucherPage } from '../voucher/voucher';
import { Observable } from 'rxjs';

@Component({
  selector: 'page-explore',
  templateUrl: 'explore.html'
})
export class ExplorePage {

  public category: string;
  public categories: ICategory[] = [];
  public hotVouchers?: Observable<IVoucher[]>;
  public subtitle?: string;
  public title: string;

  constructor(
    private navCtrl: NavController,
    private navParams: NavParams,
    private categoryService: CategoryService,
    private voucherService: VoucherService,
  ) {
    this.category = this.navParams.get('category');
    this.title = this.category || 'Explore';
    this.categoryService.get(this.category)
      .subscribe((categories) => {
        console.debug('Categories:', categories);
        for (const category of categories) {
          if (category.$key === '!subtitle') {
            this.subtitle = category.$value;
          } else {
            this.categories.push(category);
          }
        }
      });
    if (this.category) {
      this.hotVouchers = this.voucherService.getByCategory(this.category)
        .map(vouchers => vouchers.filter(v => v.featured));
    }
  }

  public clickCategory(category) {
    if (category.$value !== true) {
      this.navCtrl.push(ExplorePage, {category: category.$key});
    } else {
      this.navCtrl.push(CategoryPage, {category: this.category, subcategory: category.$key})
    }
  }

  public clickVoucher(voucher) {
    this.navCtrl.push(VoucherPage, {voucher});
  }

}
