import {LoggerFactory, ILogger} from 'ts-smart-logger';

import {ILanguageDetector} from './ILanguageDetector';

export class LanguageDetectorAdapter {

	private static logger: ILogger = LoggerFactory.makeLogger(LanguageDetectorAdapter);

    static toBrowserLanguageDetector(browserLanguageDetector:ILanguageDetector):{new():ILanguageDetector} {
        class LanguageDetector implements ILanguageDetector {

        	constructor() {
		        LanguageDetectorAdapter.logger.debug('[$LanguageDetectorAdapter][constructor] LanguageDetector wrapper has been instantiated');
	        }

            public detect():string {
                const result:string =  browserLanguageDetector.detect();
	            LanguageDetectorAdapter.logger.debug('[$LanguageDetectorAdapter][detect] Detect method returns the language as', result);
	            return result;
            }
        }

        LanguageDetector['type'] = 'languageDetector';
        return LanguageDetector;
    }
}
