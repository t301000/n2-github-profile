import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { NavbarComponent } from './components/navbar/navbar.component';
import { ConfigService } from './services/config.service';

@Component({
    moduleId: module.id,
    selector: 'my-app',
    templateUrl: 'app.component.html',
    directives: [ROUTER_DIRECTIVES, NavbarComponent],
    providers: [ConfigService]
})
export class AppComponent {

  constructor(
    private configService: ConfigService,
    private titleService: Title
  ) {
    this.setSiteTitle();
  }

  private setSiteTitle() {
    this.titleService.setTitle(this.configService.config.siteName);
  }
}
