import { Injectable } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation';
import { AngularFire } from 'angularfire2';
import { Observable } from 'rxjs';
import * as GeoFire from 'geofire';

import LatLngLiteral = google.maps.LatLngLiteral;

interface Location {
  key: string;
  location: LatLngLiteral;
  distance: number;
}

@Injectable()
export class LocationService {

  private geoQuery;
  private currentLocation: {center: number[], radius: number} = {center: null, radius: null};
  private _geoCallbackRegistration;

  constructor(
    private af: AngularFire,
    private geolocation: Geolocation,
  ) {
    this.geolocation.getCurrentPosition()
      .catch((error) => {
        console.error('Error getting location', error);
        return {coords: {latitude: 53.4, longitude: -2.2}};
      })
      .then(({coords}) => {
        console.debug(`Location ${coords}, loading map...`);
        this.setLocation({center: {lat: coords.latitude, lng: coords.longitude}});
      });
  }

  public getLatLng(): LatLngLiteral {
    return {
      lat: this.currentLocation.center[0],
      lng: this.currentLocation.center[1],
    };
  }

  /**
   * Return the distance in km between the provided target and the current set location.
   */
  public getDistance(target: LatLngLiteral) {
    return GeoFire.distance([target.lat, target.lng], this.currentLocation.center);
  }

  /**
   * Set the location query (center and radius) for the observable stream.  Both must be set initially,
   * but either can be updated partially later.
   */
  public setLocation({center, radius}: {center?: LatLngLiteral, radius?: number}): this {

      this.currentLocation.center = center ? [center.lat%180, center.lng%180] : this.currentLocation.center;
    this.currentLocation.radius = radius || this.currentLocation.radius;
    if (this.isReady()) {
      if (this.geoQuery) {
     
        this.geoQuery.updateCriteria(this.currentLocation);
      } else {
        const geoFire = new GeoFire(this.af.database.list('/locations').$ref);
        this.geoQuery = geoFire.query(this.currentLocation);
      }
    }
    return this;
  }

  /**
   * Subscribe to the stream of locations for the geoQuery set. Throws an error if called before geoQuery is set.
   */
  public getNearby(): Observable<Location> {
    if (!this.isReady()) {
      throw new Error('Must set a location and radius before subscribing');
    }
    return Observable.fromEventPattern(this._subscribe.bind(this), this._unsubscribe.bind(this),
      (key, location, distance) => ({ key, location, distance })
    );
  }

  private _subscribe(handler) {
    this._geoCallbackRegistration = this.geoQuery.on('key_entered', handler);
  }

  private _unsubscribe() {
    this._geoCallbackRegistration.cancel();
  }

  private isReady(): boolean {
    return !!(this.currentLocation.center && this.currentLocation.radius);
  }

}
