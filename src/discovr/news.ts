import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

import { INews } from './entities';

@Injectable()
/**
 * A class for observing news.
 */
export class NewsService {

  constructor(private af: AngularFire) {}

  /**
   * Get the latest {limit} news items, 5 by default.
   */
  public get(limit = 5): FirebaseListObservable<INews[]> {
    return this.af.database.list('/news', {
      query: {
        limitToFirst: limit,
      },
    });
  }

}
