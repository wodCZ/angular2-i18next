import {NgModule} from '@angular/core';

import {TranslatePipe} from "./TranslatePipe";
import {TranslateI18Next} from "./TranslateI18Next";

@NgModule({
	providers: [
		TranslateI18Next
	],
	declarations: [
		TranslatePipe
	]
})
export class TranslateI18NextModule {
}
