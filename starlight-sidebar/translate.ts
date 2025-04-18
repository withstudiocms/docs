/**
 * To add a new translation for the sidebar, create a new `<lang>.json` in this directory and add
 * it's name to the `Translations` array below and it will be added as a supported sidebar lang.
 */
import fallback from './en.json';

export const Translations = ['en', 'fr', 'ko', 'de'] as const;

type TranslationLangs = (typeof Translations)[number];

const jsonFiles = await Promise.all(
	Translations.map(async (t) => {
		return { lang: t, data: (await import(/* @vite-ignore */ `./${t}.json`)).default };
	})
);

export const getTranslations = (key: string) => {
	const translations = new Map<TranslationLangs, Record<string, string>>();

	for (const translation of Translations) {
		translations.set(translation, jsonFiles.find((t) => t.lang === translation)?.data);
	}

	const toReturnObject: Partial<Record<TranslationLangs, string>> = {};

	for (const [trans, value] of translations.entries()) {
		toReturnObject[trans] =
			(value[key] as string | undefined) || (fallback[key as keyof typeof fallback] as string);
	}

	return toReturnObject as Record<TranslationLangs, string>;
};
