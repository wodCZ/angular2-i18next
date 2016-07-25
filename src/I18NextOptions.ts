import {ILanguageDetector} from './browser/ILanguageDetector';
import {IBackendOptions} from './backend/IBackendOptions';

export interface IOptionsMapping {
    [index:string]:string;
}

export interface IDetectionOptions {
    order:Array<string>;
}

export interface I18NextOptions {
    /**
     * I18next options
     */
    debug?:boolean;
    initImmediate?:boolean;
    lng?:string;
    fallbackLng?:string;
    ns?:string|Array<string>;
    defaultNS?:string;
    fallbackNS?:boolean;
    whitelist?:boolean;
    nonExplicitWhitelist?:boolean;
    lowerCaseLng?:boolean;
    load?:string;
    preload?:boolean;
    pluralSeparator?:string;
    contextSeparator?:string;
    saveMissing?:boolean;
    saveMissingTo?:string;
    missingKeyHandler?:boolean;
    appendNamespaceToMissingKey?:boolean;
    postProcess?:boolean;
    returnNull?:boolean;
    returnEmptyString?:boolean;
    returnObjects?:boolean;
    joinArrays?:boolean;
    detection:IDetectionOptions;
    backend?:IBackendOptions;

    /**
     * TranslateI18Next options
     */
    mapping?:IOptionsMapping;
    browserLanguageDetector?:ILanguageDetector;
}
