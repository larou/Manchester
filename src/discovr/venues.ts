import { Injectable } from '@angular/core';
import { AngularFire } from 'angularfire2';
import { Observable } from 'rxjs';

import * as moment from 'moment';
import * as shortid from 'shortid';

import { IRawVenue, IVenue } from './entities';
import { IStore } from './store';

import { LocationService } from './location';
import { Venue, VenueFactory } from './entities/venue';


@Injectable()
/**
 * A class for observing venues.  Requires a geographic location to return venues nearby.
 */
export class VenueService implements IStore<IVenue> {

  constructor(
    private af: AngularFire,
    private locationService: LocationService,
    private venueFactory: VenueFactory,
  ) {}

  /**
   * Get all the venues
   */
  public getAll(): Observable<IVenue[]> {
    return this.af.database.list('venues')
      .map((venues: IVenue[]) => this.venueFactory.fromRaw(venues));
  }

  /**
   * Get a venue from firebase by its $key
   * @param id: Firebase id for the venue
   */
  public getById(id: string): Observable<IVenue> {
    return this.af.database.object(`/venues/${id}`)
      .map(venue => this.venueFactory.fromRaw(venue));
  }

  /**
   * Get a list of venues from firebase by category
   */
  public getByCategory(categories: string[]): Observable<IVenue[]> {
    const keyPrefix = categories.join('|||');
    return this.af.database.list('venues', {
      query: {
        orderByKey: true,
        startAt: keyPrefix,
        endAt: keyPrefix + '~',
      },
    })
      .map((venues: IVenue[]) => this.venueFactory.fromRaw(venues))
      .do(venues => console.debug('Got by category:', venues, keyPrefix));
  }

  public getNearby(): Observable<IVenue> {
    return this.locationService.getNearby()
      .flatMap(({key}) => {
        return this.af.database.object(`/venues/${key}`);
      })
      .map(venue => this.venueFactory.fromRaw(venue))
      .do(venue => console.debug('Got by location:', venue));
  }

  /**
   * Update the venue in the database.  If category and subcategory has changed, will mutate the passed venue
   * with an updated $key
   * @param venue
   * @returns {firebase.Promise<any>|firebase.Thenable<any>}
   */
  public save(venue: IRawVenue|IVenue) {
        console.log("hello");

    if (venue instanceof Venue) {
      venue = venue.toRaw();
    }
    const oldKey = venue.$key;
    const newKey = `${venue.category}|||${venue.subcategory}`;
    if (!oldKey || oldKey.slice(0, newKey.length) !== newKey) {
      venue.$key = `${newKey}|||${shortid.generate()}`;
    }
    venue.updatedAt = moment().toISOString();
    if (venue.createdAt === undefined) {
      venue.createdAt = moment().toISOString();
    }
    const clone = (<any>Object).assign({}, venue);
    delete clone.$key;
    console.log('Saving venue', venue);
    return this.af.database.object(`/venues/${venue.$key}`)
      .update(clone)
      .then(() => {
        if (oldKey && venue.$key !== oldKey) {
          console.log('Deleting old record', oldKey);
          return this.af.database.object(`/venues/${oldKey}`).remove();
        }
      });
  }

  public destroy(venue: IVenue): firebase.Promise<void> {
    return this.af.database.object(`/venues/${venue.$key}`)
      .remove();
  }

}
