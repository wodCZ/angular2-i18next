import {ILanguageDetector} from './ILanguageDetector';

export class LanguageDetectorAdapter {

    static toBrowserLanguageDetector(browserLanguageDetector:ILanguageDetector):{new():ILanguageDetector} {
        class LanguageDetector implements ILanguageDetector {

            public detect():string {
                return browserLanguageDetector.detect();
            }

            public cacheUserLanguage() {
            }
        }

        LanguageDetector['type'] = 'languageDetector';
        return LanguageDetector;
    }
}
