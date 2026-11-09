import {
	getLocale as getRuntimeLocale,
	setLocale as runtimeSetLocale,
	overwriteGetLocale,
	overwriteSetLocale,
	type Locale
} from '#lib/paraglide/runtime.js';

// Captured before `overwriteSetLocale` reassigns the `setLocale` export —
// otherwise calling it from the override below would recurse into itself.
const originalSetLocale = runtimeSetLocale;

let locale = $state<Locale>(getRuntimeLocale());

// Message functions (`m.*`) import `getLocale`/`setLocale` as live ESM
// bindings, so overwriting them here is observed everywhere, including
// already-imported modules. Routing getLocale through `$state` makes every
// template expression that calls a message function reactive to locale
// changes, with no full page reload or manual re-render needed.
overwriteGetLocale(() => locale);
overwriteSetLocale((newLocale) => {
	locale = newLocale;
	// Strategies other than "url" (cookie, localStorage, ...) still persist
	// the choice; `reload: false` is forced so no navigation/reload happens.
	originalSetLocale(newLocale, { reload: false });
});

export function getActiveLocale() {
	return locale;
}
