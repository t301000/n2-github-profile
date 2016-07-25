import { provideRouter, RouterConfig } from '@angular/router';

import { ProfileComponent } from './components/profile/profile.component';
import { AboutComponent } from './components/about/about.component';

export const routes: RouterConfig = [
  {path: '', redirectTo:'profile', pathMatch: 'full'},
  {path: 'profile', component: ProfileComponent},
  {path: 'about', component: AboutComponent},
  {path: '**', redirectTo:''}
];

export const ROUTER_PROVIDERS = [
  provideRouter(routes)
];
