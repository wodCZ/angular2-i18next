import {ILanguageDetector} from './ILanguageDetector';

export class LanguageDetectorAdapter {

    static toBrowserLanguageDetector(browserLanguageDetector:ILanguageDetector):{new():ILanguageDetector} {
        class LanguageDetector implements ILanguageDetector {

            private currentLanguage:string;

            public init() {
                this.currentLanguage = browserLanguageDetector.detect();
            }

            public detect():string {
                return this.currentLanguage;
            }

            public cacheUserLanguage() {
            }
        }

        LanguageDetector['type'] = 'languageDetector';
        return LanguageDetector;
    }
}
