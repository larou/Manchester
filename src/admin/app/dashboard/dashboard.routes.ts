import { Route } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { VenueFormComponent } from './venues/form/venue.form.component';
import { IconsComponent } from './icons/icons.component';
import { VenuesComponent } from './venues/venues.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { TypographyComponent } from './typography/typography.component';
import { MapsComponent } from './maps/maps.component';
import { UpgradeComponent } from './upgrade/upgrade.component';
import { VoucherFormComponent } from './vouchers/voucher.form.component';

export const MODULE_ROUTES: Route[] = [
  {path: 'dashboard', component: HomeComponent},
  {path: 'venues', component: VenuesComponent},
  {path: 'venues/create', component: VenueFormComponent},
  {path: 'venues/:id/update', component: VenueFormComponent},
  {path: 'venues/:venueId/vouchers', component: VoucherFormComponent},
  {path: 'venues/:venueId/vouchers/:voucherId', component: VoucherFormComponent},
  {path: 'icons', component: IconsComponent},
  {path: 'notifications', component: NotificationsComponent},
  {path: 'typography', component: TypographyComponent},
  {path: 'maps', component: MapsComponent},
  {path: 'upgrade', component: UpgradeComponent},
  {path: '', redirectTo: 'dashboard', pathMatch: 'full'}
];

export const MODULE_COMPONENTS = [
  HomeComponent,
  VenuesComponent,
  VenueFormComponent,
  VoucherFormComponent,
  IconsComponent,
  NotificationsComponent,
  TypographyComponent,
  MapsComponent,
  UpgradeComponent,
];
