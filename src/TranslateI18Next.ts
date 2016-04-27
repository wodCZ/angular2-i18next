import {
    Injectable,
    Inject
} from 'angular2/core'

import * as Promise from 'bluebird';

const i18next = require('i18next'),
    i18nextXHRBackend = require('i18next-xhr-backend'),
    i18nextBrowserLanguageDetector = require('i18next-browser-languagedetector');

@Injectable()
export class TranslateI18Next {

    private ready:boolean = false;
    private i18nextPromise:Promise.Thenable<void>;

    public init(options?:any):Promise.Thenable<void> {
        return this.i18nextPromise =
            new Promise<void>((resolve:(thenableOrResult?:void | Promise.Thenable<void>) => void, reject:(error:any) => void) => {
                i18next
                    .use(i18nextXHRBackend)
                    .use(i18nextBrowserLanguageDetector)
                    .init(
                        Object.assign({
                            detection: {
                                order: ['navigator']
                            },
                            fallbackLng: 'en'
                        }, options),
                        (err:any) => {
                            if (err) {
                                console.error(err);
                                reject(err);
                            } else {
                                this.ready = true;
                                resolve(null);
                            }
                        });
            });
    }

    public translate(key:string, options?:any):string {
        return i18next.t(key, options || {});
    }
}
