# angular2-i18next

An implementation of i18next wrapper for Angular 2.

## Installation

First you need to install the npm module:
```sh
npm install angular2-i18next --save
```

## Use

**main.ts**
```typescript
import {TranslateI18Next} from 'angular2-i18next';

browser.bootstrap(App, [
        TranslateI18Next,
        ...
        ]);
```

**app.ts**
```typescript
import {TranslatePipe, TranslateI18Next} from 'angular2-i18next';

@Component({
  selector: 'app',
  pipes: [TranslatePipe],
  ...
});
export class App {

    private appleCount: number;
    ...
    
    viewReady:boolean = false;
    
    constructor(private translateI18Next:TranslateI18Next) {
        translateI18Next.init({
            debug: true,                                                        // optional
            mapping: {"specific_backend_message": "message_for_translate"},     // optional
            browserLanguageDetector: injectableCustomLanguageDetectorService,   // optional - the specific application language detector (allows you to return the language of the user) 
            backend: injectableBackendConfigFactory                             // optional - allows to change "loadPath" i18next parameter
        }).then(() => {
            this.viewReady = true;
        });
    }
}
```

**app.html**
```html
<div *ngIf="viewReady" [innerHTML]='"<span style=\"color:red;\">You have {count} apple</span>" | translate:{count: appleCount}'></div>
```

**src/locales/en/translation.json**
```json
{
  "<span style=\"color:red;\">You have {count} apple</span>": "<span style=\"color:red;\">You have {count} apple</span>",
  "<span style=\"color:red;\">You have {count} apple</span>_plural": "<span style=\"color:red;\">You have {count} apples</span>"
}
```

**src/locales/ru/translation.json**
```json
{
  "<span style=\"color:red;\">You have {count} apple</span>": "<span style=\"color:green;\">У вас есть одно яблоко</span>",
  "<span style=\"color:red;\">You have {count} apple</span>_2": "<span style=\"color:blue;\">У вас есть {count} яблока</span>",
  "<span style=\"color:red;\">You have {count} apple</span>_5": "<span style=\"color:yellow;\">У вас есть {count} яблок</span>"
}
```

**I18nModule.ts** (the localized constants at the typescript files)
```typescript
class Products {

    static NAME:string = "Name";
    ...
}

export class I18nModule {
    static PRODUCTS = Products;
}
```

## Use i18next-parser (gulp task)

```javascript
var gulp = require('gulp'),
	i18next = require('i18next-parser');

gulp.task('i18next', function () {
	gulp.src(['src/**/*.html', 'src/*.html', 'src/locales/I18nModule.ts'])
		.pipe(i18next({
			locales: ['en'],
			output: '../src/locales',

			// The workaround (i18next-parser does not support "namespaceSeparator === false" flag):
			//      options.namespaceSeparator || ':';
			//      options.keySeparator || '.';
			keySeparator: "eb6c8400-b5f8-4177-a417-5e5e902a6c83",
			namespaceSeparator: "eb6c8400-b5f8-4177-a417-5e5e902a6c83",

			// Supported patterns:
			//      1) The gettext format like << 'Hello {{count}} world!' | translate:{count: 100} >>
			//      2) The I18nModule format like << static YOUR_CONSTANT:string = "Your value..."; >>
			//      3) The inner html format << <div [innerHTML]='"<span style=\"color:red;\">You have {count} apple</span>" | translate:{count: appleCount}'></div> >>
			parser: '\'(.+)\'.+translate|static [A-Z_0-9 ]+\: {0,}string \= ["|\'](.+)["|\']|\\[innerHTML\\]\=\'\"(.+)\" +\\|'
		}))
		.pipe(gulp.dest('src/locales'));
});
```

## Publish

```sh
npm install & tsc & npm publish ./
```

## License

Licensed under MIT.