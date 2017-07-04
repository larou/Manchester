import { Component, Input } from '@angular/core';

import { Day } from '../../../../../utils';

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
  selector: 'venue-opening-times',
  templateUrl: 'venue-opening-times.html'
})
export class VenueOpeningTimes {
  @Input() openingTimes;

  public get days() {
    return Object.keys(HUMANIZED_DAYS);
  }

  public isToday(day: Day) {
    return false;
  }

  public humanize(day: Day) {
    return HUMANIZED_DAYS[day];
  }
}
