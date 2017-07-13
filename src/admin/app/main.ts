require('../assets/js/bootstrap.min');
require('../assets/js/arrive.min');
require('../assets/js/material.min');
require('../assets/js/bootstrap-notify');
require('../assets/js/material-dashboard');
import 'zone.js';
import 'reflect-metadata';

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app.module';
import { enableProdMode } from '@angular/core';
enableProdMode();
const platform = platformBrowserDynamic();
platform.bootstrapModule(AppModule);

require('../assets/js/initMenu');
