import { enableProdMode } from '@angular/core';
import { bootstrap }    from '@angular/platform-browser-dynamic';
import { Title } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ROUTER_PROVIDERS } from './app.routes';
import { CONFIG } from './config';

if(CONFIG.production) {
  enableProdMode();
}

bootstrap(AppComponent, [ROUTER_PROVIDERS, Title]);
