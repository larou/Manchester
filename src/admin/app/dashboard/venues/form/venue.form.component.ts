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
    location: {lat:0,lng:0},
    contacts: [
      {title: 'Call',details:''},
    ],
    social: [
      {title: 'Facebook',details:''},
      {title: 'Snapchat',details:''},
      {title: 'Instagram',details:''},
      {title: 'Message',details:''},
    ],
    photos: [],
    openingTimes :{
      "mon":{open: '',
             close: ''},
    "tue":{open: '',
             close: ''},
    "thu":{open: '',
             close: ''},
    "wed":{open: '',
             close: ''},
    "fri":{open: '',
             close: ''},
    "sat":{open: '',
             close: ''},
    "sun":{open: '',
             close: ''}

    }
    
  } as IVenue  ;

  public TabDays: Array<any> ; 
  public days:Array<any>;
  public ListCat : any ;
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

      this.TabDays = [{name:"Monday",value:"mon"},
                      {name:"Tuesday",value:"tue"},
                      {name:"Thursday",value:"thu"},
                      {name:"Wednesday",value:"wed"},
                      {name:"Friday",value:"fri"},
                      {name:"Saturday",value:"sat"},
                      {name:"Sunday",value:"sun"}];
     

      
  }

  public addPhoto() {
    this.venue.photos.push('');
  }

  public onSubmit(form: NgForm) {
    
    console.log('SUBMIT', form, form.valid, this.venue);
    if (form.valid) {
      if(this.venue.photos)
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
