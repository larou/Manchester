import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { CategoryService, ICategory, ISubCategory, IVenue, VenueService } from '../../../../../discovr';
const HUMANIZED_DAYS = {
  'sun': 'Sunday',
  'mon': 'Monday',
  'tue': 'Tuesday',
  'wed': 'Wednesday',
  'thu': 'Thursday',
  'fri': 'Friday',
  'sat': 'Saturday',
};

@Component({
  selector: 'user-cmp',
  template: require('./venue.form.component.html'),
})
export class VenueFormComponent implements OnInit {

  public categories: ICategory[];
  public subcategories: Observable<ISubCategory[]>;
  public venue: IVenue = {
    location: {},
    contacts: [
      {title: 'Call'},
    ],
    social: [
      {title: 'Facebook'},
      {title: 'Snapchat'},
      {title: 'Instagram'},
    ],
    photos: [],
  } as IVenue;

  public TabDays: Array<any> ; 
  public days:Array<any>;
  constructor(
    private venueService: VenueService,
    private categoryService: CategoryService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  public ngOnInit() {
    this.categoryService.get()
      .switchMap((categories) => {
        this.categories = categories;
          return this.route.params;

      })
      .filter(params => params.id)
      .switchMap(params => this.venueService.getById(params.id))
      .mergeMap((venue) => {
        console.log('filling subcategories');
        return this.changeCategory(venue.category).mapTo(venue)
      })
      .subscribe(venue => this.venue = venue);

      this.TabDays = ["mon","tue","thu","wed","fri","sat","sun"];
      this.days=["Monday","Tuesday","Thursday","Friday","Saturday","Sunday"];
  }

  public addPhoto() {
    this.venue.photos.push('');
  }

  public onSubmit(form: NgForm) {
    
    console.log('SUBMIT', form, form.valid, this.venue);
    if (form.valid) {
      this.venue.photos = this.venue.photos.filter(imgUrl => imgUrl);
      this.venueService.save(this.venue)
        .then(() => {
          this.router.navigate(['venues']);
        })
        .catch((err) => console.log('Error saving', err));
    } else {
      console.log('Form invalid', form);
    }
  }

  public changeCategory(category) {
    console.log('change category', category);
    return this.subcategories = this.categoryService.get(category)
      .map((subcategories) => subcategories.filter(subcategory => subcategory.$key !== '!subtitle'));
  }


}
