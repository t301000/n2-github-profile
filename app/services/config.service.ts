import { Injectable } from '@angular/core';

import { CONFIG } from '../config';

@Injectable()
export class ConfigService {

    config: any;

    constructor() {
      this.config = CONFIG;
    }

}
