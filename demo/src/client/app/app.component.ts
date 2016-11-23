import { Component } from '@angular/core';
import { Config } from './shared/index';
import './operators';

import {TranslateI18Next} from 'angular2-i18next/index';

/**
 * This class represents the main application component.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-app',
  templateUrl: 'app.component.html',
})
export class AppComponent {
  constructor(private translateI18Next:TranslateI18Next) {
    console.log('Environment config', Config);

    translateI18Next.init({
      debug: true,
      returnEmptyString: false,
      backend: {loadPath: 'assets/locales/{{lng}}/{{ns}}.json?_v=' + Date.now()}
    }).then(() => {
      this.viewReady = true;

      this.appleCount = 1;
      setTimeout(() => this.appleCount = 2, 1000);
    });
  }
}
