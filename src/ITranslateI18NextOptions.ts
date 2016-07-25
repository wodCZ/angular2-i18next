import {ILanguageDetector} from './browser/ILanguageDetector';
import {IBackendOptions} from './backend/IBackendOptions';

export interface ITranslateI18NextOptions {
    /**
     * I18next options
     */
    fallbackLng?:string;
    backend?:IBackendOptions;
    browserLanguageDetector?:ILanguageDetector;

    /**
     * TranslateI18Next options
     */
    mapping?:Object;
    debug?:boolean;
}
