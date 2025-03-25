import en from './en.json';
import es from './es.json';

type TranslationKey = keyof typeof en;

function getKey<T extends Record<string, string>, K extends keyof T | keyof typeof en>(
	json: T,
	key: K
) {
	return json[key] || en[key as keyof typeof en];
}

export function getTranslations(key: TranslationKey) {
	return {
		en: getKey(en, key),
		es: getKey(es, key),
	};
}
