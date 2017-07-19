import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { MODULE_COMPONENTS, MODULE_ROUTES } from './dashboard.routes';
import { DiscovrModule } from '../../../discovr';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(MODULE_ROUTES),
    DiscovrModule,
  ],
  declarations: [MODULE_COMPONENTS],
})
export class DashboardModule {}
