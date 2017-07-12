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
  public subTitle: string;
  public Vouchers : any;
  public NbVouchers : number ;

  constructor(
    private navCtrl: NavController,
    private navParams: NavParams,
    private categoryService: CategoryService,
    private voucherService: VoucherService,
  ) {

  this.Vouchers= this.voucherService.getAllVouchers()
  this.Vouchers.subscribe(u => {
      this.NbVouchers = u.length
      
    });
    this.category = this.navParams.get('category');
    this .subTitle = this.navParams.get('subtitle')
    this.title = this.category || 'Explore';  
    this.categoryService.get(this.category)
      .subscribe((categories) => {
        //console.log('Categories:', categories);
        for (let i in categories) {
          let sum = 0;            
            for (var x in categories[i]) {
              if(categories[i][x].Places) {
                sum += parseInt(categories[i][x].Places)
              }
            }
            categories[i].sum = sum
            categories[i].subTitle = this.subTitle
        }
        for (const category of categories) {
          if (category.$key === '!subtitle' || category.$key === 'subtitle') {
            this.subtitle = category.$value;
          } else {
            this.categories.push(category);
          }
        }
      });
    if (this.category) {
      this.hotVouchers = this.voucherService.getFeatured(this.NbVouchers)
        .map(vouchers => vouchers.filter(v => v.featured));
       
    }
  }

  public clickCategory(category) {
    if (category.$value !== true) {
      this.navCtrl.push(ExplorePage, { category: category.$key , subtitle: category.subtitle});

    } else {
      this.navCtrl.push(CategoryPage, { category: this.category, subcategory: category.$key })
    }
  }

  public clickVoucher(voucher) {
    this.navCtrl.push(VoucherPage, { voucher });
  }

}
