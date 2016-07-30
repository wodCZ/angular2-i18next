import {Injectable} from '@angular/core'

import {LanguageDetectorAdapter} from './browser/LanguageDetectorAdapter';
import {ILanguageDetector} from './browser/ILanguageDetector';
import {I18NextOptions, ITranslationKeyMapping, IDetectionOptions} from './I18NextOptions';

const i18next = require('i18next'),
    i18nextXHRBackend = require('i18next-xhr-backend'),
    i18nextBrowserLanguageDetector = require('i18next-browser-languagedetector');

const DEFAULT_FALLBACK_LNG:string = 'en';

@Injectable()
export class TranslateI18Next {

    private i18nextPromise:Promise<void>;
    private mapping:ITranslationKeyMapping = {};

    public init(options?:I18NextOptions):Promise<void> {
        options = options || {};

        const fallbackLng:string = options.fallbackLng || DEFAULT_FALLBACK_LNG;
        const detection:IDetectionOptions = options.detection || {
                order: ['navigator']
            };

        const browserLanguageDetector:ILanguageDetector = options.browserLanguageDetector
            ? LanguageDetectorAdapter.toBrowserLanguageDetector(options.browserLanguageDetector)
            : i18nextBrowserLanguageDetector;

        if (options.debug) {
            console.debug('[$TranslateI18Next] Fallback language is', fallbackLng);
            console.debug('[$TranslateI18Next] The browser language detector is', browserLanguageDetector);
        }

        this.mapping = options.mapping || this.mapping;

        return this.i18nextPromise =
            new Promise<void>((resolve:(thenableOrResult?:void | Promise<void>) => void, reject:(error:any) => void) => {
                i18next
                    .use(i18nextXHRBackend)
                    .use(browserLanguageDetector)
                    .init(
                        Object.assign({}, options, {
                            fallbackLng: fallbackLng,
                            detection: detection,

                            /**
                             * The keys may contain normal human phrases, i.e. the "gettext format" therefore we should disable "i18next format"
                             */
                            nsSeparator: false,
                            keySeparator: false
                        }),
                        (err:any) => {
                            if (err) {
                                console.error(err);

                                reject(err);
                            } else {
                                if (options.debug) {
                                    console.debug('[$TranslateI18Next] The translations has been loaded for the current language', i18next.language);
                                }
                                resolve(null);
                            }
                        });
            });
    }

    public translate(key:string, options?:any):string {
        if (key) {
            key = this.mapping[key] || key;
        }

        options = options || {};
        options.interpolation = options.interpolation || {};

        // Angular2 interpolation template should not interfere with i18next interpolation template
        options.interpolation.prefix = "{";
        options.interpolation.suffix = "}";

        return i18next.t(key, options);
    }

    public changeLanguage(lng?:string, callback?:Function) {
        i18next.changeLanguage(lng, callback);
    }
}
