import {
    Injectable,
    Inject
} from 'angular2/core'

import * as Promise from 'bluebird';

const i18next = require('i18next'),
    i18nextXHRBackend = require('i18next-xhr-backend'),
    i18nextBrowserLanguageDetector = require('i18next-browser-languagedetector');

const DEFAULT_FALLBACK_LNG:string = 'en';

@Injectable()
export class TranslateI18Next {

    private ready:boolean = false;
    private i18nextPromise:Promise.Thenable<void>;

    private fallbackLng:string = DEFAULT_FALLBACK_LNG;
    private debug:boolean = false;

    public init(options?:any):Promise.Thenable<void> {
        options = options || {};

        this.fallbackLng = options.fallbackLng = options.fallbackLng || this.fallbackLng;
        this.debug = options.debug = options.debug || this.debug;

        if (this.debug) {
            console.debug('Fallback language is', this.fallbackLng);
        }

        return this.i18nextPromise =
            new Promise<void>((resolve:(thenableOrResult?:void | Promise.Thenable<void>) => void, reject:(error:any) => void) => {
                i18next
                    .use(i18nextXHRBackend)
                    .use(i18nextBrowserLanguageDetector)
                    .init(
                        Object.assign({
                            detection: {
                                order: ['navigator']
                            }
                        }, options),
                        (err:any) => {
                            if (err) {
                                console.error(err);

                                reject(err);
                            } else {
                                if (this.debug) {
                                    console.debug('The translations has been loaded for the current language', i18next.language);
                                }

                                this.ready = true;
                                resolve(null);
                            }
                        });
            });
    }

    public translate(key:string, options?:any):string {
        options = options || {};
        const translatedValue = i18next.t(key, options);

        if (translatedValue) {
            return translatedValue;
        }

        if (this.debug) {
            console.warn('The translation is not found for the key', key, 'and language', i18next.language);
        }

        return i18next.t(key, Object.assign(options, {lng: this.fallbackLng}))
            || key;
    }
}
