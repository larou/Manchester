import { AfterViewInit, ChangeDetectorRef, Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import * as moment from 'moment';

import { IVenue, VenueService } from '../../discovr';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { VenuePage } from '../venue/venue';

@Component({
  selector: 'page-category',
  templateUrl: 'category.html'
})
export class CategoryPage implements AfterViewInit {

  public category: string;
  public subcategory: string;
  public sortBy = 'distance';
  public trending: Observable<IVenue[]>;
  public venues: IVenue[];
  public title : any ;
  public Places : Array<any>;
  private _venues: Subject<IVenue[]>;

  constructor(
    private cd: ChangeDetectorRef,
    private navCtrl: NavController,
    private navParams: NavParams,
    private venueService: VenueService,
  ) {
    this.category = navParams.get('category');
    this.subcategory = navParams.get('subcategory');
    this.title = this.subcategory['title']
    this.places()
  }

  public ngAfterViewInit() {
    this._venues = new BehaviorSubject([]);
    this.trending = this._venues
      .map((venues: IVenue[]) => venues
        .filter(v => v.featured)
        .sort((a, b) => b.priority - a.priority));
    this.venueService.getByCategory([this.category, this.title])
      .subscribe(this._venues);
    this.changeSort();
    
  }

  public clickVenue(venue) {
    this.navCtrl.push(VenuePage, {venue: venue , location: venue.location});
    
  }
//get places 
public places() {
  this.venueService.getByCategory([this.category, this.title]).subscribe(v => {
    this.Places = v
    this.Places = this.shuffleArray(this.Places)
    
  })
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
  public changeSort(): void {
    switch (this.sortBy) {
      case 'alphabetical':
        this._venues
          .map((venues) => {
            console.debug('Sorting venues by name', venues.map(v => v.name));
            const clone = venues.slice();
            clone.sort((a, b) => a.name.localeCompare(b.name));
            return clone;
          })
          .subscribe(venues => this.venues = venues);
        break;
      case 'distance':
        this._venues
          .map((venues) => {
            console.debug('Sorting venues by distance', venues.map(v => [v.name, v.getDistance()]));
            const clone = venues.slice();
            clone.sort((a, b) => a.getDistance() - b.getDistance());
            return clone;
          })
          .subscribe(venues => this.venues = venues);
        break;
      case 'age':
        this._venues
          .map((venues) => {
            console.debug('Sorting venues by age', venues.map(v => v.createdAt));
            const clone = venues.slice();
            clone.sort((a, b) => moment(a.createdAt).isBefore(b.createdAt)? 1 : -1);
            return clone;
          })
          .subscribe(venues => this.venues = venues);
        break;
    }
    this.cd.detectChanges();
  }

}
