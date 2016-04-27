import {
    Inject,
    Pipe,
    PipeTransform
} from 'angular2/core';

import {TranslateI18Next} from './TranslateI18Next';

@Pipe({
    name: 'translate'
})
export class TranslatePipe implements PipeTransform {

    constructor(@Inject(TranslateI18Next) private translateI18Next:TranslateI18Next) {
    }

    public transform(value:string, args:any[]):string {
        return this.translateI18Next.translate(value, args && args.length ? args[0] : null);
    }
}
