import {
    Injectable,
    Inject
} from 'angular2/core'

import * as Promise from 'bluebird';

import {I18next} from 'i18next';

const i18nextXHRBackend = require('i18next-xhr-backend'),
    i18nextBrowserLanguageDetector = require('i18next-browser-languagedetector');

@Injectable()
export class TranslateI18Next {

    private i18next:I18next.I18n;
    private ready:boolean = false;
    private i18nextPromise:Promise.Thenable<void>;

    constructor() {
        this.i18next = new I18next.I18n();
    }

    public init():Promise.Thenable<void> {
        if (this.i18nextPromise) {
            return this.i18nextPromise;
        }
        return this.i18nextPromise = new Promise<any>((resolve) => {
            this.i18next
                .use(i18nextXHRBackend)
                .use(i18nextBrowserLanguageDetector)
                .init(
                    {
                        detection: {
                            order: ['navigator']
                        },
                        fallbackLng: 'en'
                    },
                    (err:any) => {
                        this.ready = true;
                        resolve(err);
                    });
        });
    }

    public translate(key:string, options?:any):string {
        return this.i18next.t(key, options);
    }
}
