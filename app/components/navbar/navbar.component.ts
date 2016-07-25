import { Component } from '@angular/core';

import { ConfigService } from '../../services/config.service';
import { ROUTER_DIRECTIVES } from '@angular/router';

@Component({
    moduleId: module.id,
    selector: 'my-navbar',
    templateUrl: 'navbar.component.html',
    directives: [ROUTER_DIRECTIVES]
})
export class NavbarComponent {

  siteName: string;

  constructor(private configService: ConfigService) {
    this.siteName = this.configService.config.siteName;
  }
}
