import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { Geolocation } from '@ionic-native/geolocation';
import { IonicModule } from 'ionic-angular';

import { AppComponent }   from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';

import { DashboardModule } from './dashboard/dashboard.module';
import { SidebarModule } from './sidebar/sidebar.module';
import { FooterModule } from './shared/footer/footer.module';
import { NavbarModule } from './shared/navbar/navbar.module';

import { HashLocationStrategy, LocationStrategy } from '@angular/common';

@NgModule({
  imports: [
    BrowserModule,
    DashboardModule,
    SidebarModule,
    NavbarModule,
    FooterModule,
    IonicModule.forRoot(AppComponent),
    RouterModule.forRoot([])
  ],
  declarations: [AppComponent, DashboardComponent],
  providers: [
    {provide: LocationStrategy, useClass: HashLocationStrategy},
    Geolocation,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
