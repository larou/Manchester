import { Component, EventEmitter, Output, AfterViewInit } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation';
import * as GeoFire from 'geofire';
import { LoadingController } from 'ionic-angular';

import LatLngLiteral = google.maps.LatLngLiteral;

import { IVenue, LocationService, VenueService } from '../../../discovr';

@Component({
  selector: 'googlemap',
  template: '<div #map id="map"></div>'
})
export class GooglemapComponent implements AfterViewInit {

  @Output() markerClick = new EventEmitter<IVenue>();

  private map: google.maps.Map;

  constructor(
    private geolocation: Geolocation,
    private loadingCtrl: LoadingController,
    private locationService: LocationService,
    private venueService: VenueService,
  ) {}

  ngAfterViewInit() {
    const loadingSpinner = this.loadingCtrl.create();
    loadingSpinner.present();
    this.geolocation.getCurrentPosition()
      .catch((error) => {
        console.error('Error getting location', error);
        return {coords: {latitude: 53.4, longitude: -2.2}};
      })
      .then((resp) => {
        console.debug(`Location ${resp.coords}, loading map...`);
        loadingSpinner.dismiss();
        this.loadMap(resp.coords);
      });
    // this.loadMap({latitude: 53.4, longitude: -2.2});
  }

  private loadMap({latitude: lat, longitude: lng}: {latitude: number, longitude: number}) {
    const center = {lat, lng};
    this.map = new google.maps.Map(document.getElementById('map'), {
      center,
      zoom: 12,
      streetViewControl: false,
    });

    const onLoadListener = this.map.addListener('bounds_changed', () => {
      this.locationService.setLocation({center, radius: calculateRadius(this.map)});
      this.venueService.getNearby()
        .distinct(venue => venue.$key)
        .subscribe((venue: IVenue) => this.addVenueToMap(venue));
      onLoadListener.remove();
    });

    this.map.addListener('center_changed', () => {
      const center: LatLngLiteral = this.map.getCenter().toJSON();
      this.locationService.setLocation({center});
    });
    this.map.addListener('zoom_changed', () => {
      const radius: number = calculateRadius(this.map);
      this.locationService.setLocation({radius});
    });
  }

  private addVenueToMap(venue: IVenue) {
    new google.maps.Marker({
      animation: google.maps.Animation.DROP,
      title: venue.name,
      position: {lat: venue.location.lat, lng: venue.location.lng},
      map: this.map,
      icon: {
        path: google.maps.SymbolPath.CIRCLE,
        fillColor: '#f22c8e',
        fillOpacity: 1,
        strokeOpacity: 0,
        scale: 16,
      },
    })
      .addListener('click', () => {
        this.map.setCenter(venue.location);
        this.markerClick.emit(venue);
      });
  }
}

function calculateRadius(map): number {
  const center: LatLngLiteral = map.getCenter().toJSON();
  const neCorner: LatLngLiteral = map.getBounds().getNorthEast().toJSON();
  return GeoFire.distance([neCorner.lat, neCorner.lng], [center.lat, center.lng]);
}
