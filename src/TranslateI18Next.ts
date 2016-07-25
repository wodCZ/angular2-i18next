import {
    Injectable,
    Inject
} from '@angular/core'

import {LanguageDetectorAdapter} from './browser/LanguageDetectorAdapter';
import {ILanguageDetector} from './browser/ILanguageDetector';
import {ITranslateI18NextOptions} from './ITranslateI18NextOptions';

const i18next = require('i18next'),
    i18nextXHRBackend = require('i18next-xhr-backend'),
    i18nextBrowserLanguageDetector = require('i18next-browser-languagedetector');

const DEFAULT_FALLBACK_LNG:string = 'en';

@Injectable()
export class TranslateI18Next {

    private ready:boolean = false;
    private i18nextPromise:Promise<void>;

    private fallbackLng:string = DEFAULT_FALLBACK_LNG;
    private debug:boolean = false;

    private mapping:Object = {};

    public init(options?:ITranslateI18NextOptions):Promise<void> {
        options = options || {};

        this.fallbackLng = options.fallbackLng = options.fallbackLng || this.fallbackLng;
        this.debug = options.debug = options.debug || this.debug;

        const browserLanguageDetector:ILanguageDetector = options.browserLanguageDetector
            ? LanguageDetectorAdapter.toBrowserLanguageDetector(options.browserLanguageDetector)
            : i18nextBrowserLanguageDetector;

        delete options.browserLanguageDetector;

        if (this.debug) {
            console.debug('[$TranslateI18Next] Fallback language is', this.fallbackLng);
            console.debug('[$TranslateI18Next] The browser language detector is', browserLanguageDetector);
        }

        this.mapping = options.mapping || this.mapping;

        return this.i18nextPromise =
            new Promise<void>((resolve:(thenableOrResult?:void | Promise<void>) => void, reject:(error:any) => void) => {
                i18next
                    .use(i18nextXHRBackend)
                    .use(browserLanguageDetector)
                    .init(
                        Object.assign({
                            detection: {
                                order: ['navigator']
                            },

                            /**
                             * The keys may contain normal human phrases, i.e. the "gettext format" therefore we should disable "i18next format"
                             */
                            nsSeparator: false,
                            keySeparator: false
                        }, options),
                        (err:any) => {
                            if (err) {
                                console.error(err);

                                reject(err);
                            } else {
                                if (this.debug) {
                                    console.debug('[$TranslateI18Next] The translations has been loaded for the current language', i18next.language);
                                }

                                this.ready = true;
                                resolve(null);
                            }
                        });
            });
    }

    public translate(key:string, options?:any):string {
        if (!key) {
            return "";
        }

        key = this.mapping[key] || key;

        options = options || {};
        options.interpolation = options.interpolation || {};

        // Angular2 interpolation template should not interfere with i18next interpolation template
        options.interpolation.prefix = "{";
        options.interpolation.suffix = "}";

        return i18next.t(key, options) || key;
    }

    public changeLanguage(lng?:string, callback?:Function) {
        i18next.changeLanguage(lng, callback);
    }
}
