import { defineConfig } from '@lunariajs/core/config';

export default defineConfig({
	repository: {
		name: 'withstudiocms/docs',
		hosting: 'github',
		branch: 'main',
	},
	sourceLocale: {
		label: 'English',
		lang: 'en',
		parameters: {
			tag: 'en',
		},
	},
	locales: [
		{
			label: 'Español',
			lang: 'es',
			parameters: {
				tag: 'es',
			},
		},
		{
			label: 'Français',
			lang: 'fr',
			parameters: {
				tag: 'fr',
			},
		},
		// {
		// 	label: 'Deutsch',
		// 	lang: 'de',
		// 	parameters: {
		// 		tag: 'de',
		// 	},
		// },
		// {
		// 	label: '日本語',
		// 	lang: 'ja',
		// 	parameters: {
		// 		tag: 'ja',
		// 	},
		// },
		// {
		// 	label: 'Italiano',
		// 	lang: 'it',
		// 	parameters: {
		// 		tag: 'it',
		// 	},
		// },
		// {
		// 	label: 'Bahasa Indonesia',
		// 	lang: 'id',
		// 	parameters: {
		// 		tag: 'id',
		// 	},
		// },
		// {
		// 	label: '简体中文',
		// 	lang: 'zh-cn',
		// 	parameters: {
		// 		tag: 'zh-CN',
		// 	},
		// },
		// {
		// 	label: 'Português do Brasil',
		// 	lang: 'pt-br',
		// 	parameters: {
		// 		tag: 'pt-BR',
		// 	},
		// },
		// {
		// 	label: 'Português',
		// 	lang: 'pt-pt',
		// 	parameters: {
		// 		tag: 'pt-PT',
		// 	},
		// },
		// {
		// 	label: '한국어',
		// 	lang: 'ko',
		// 	parameters: {
		// 		tag: 'ko',
		// 	},
		// },
		// {
		// 	label: 'Türkçe',
		// 	lang: 'tr',
		// 	parameters: {
		// 		tag: 'tr',
		// 	},
		// },
		// {
		// 	label: 'Русский',
		// 	lang: 'ru',
		// 	parameters: {
		// 		tag: 'ru',
		// 	},
		// },
		// {
		// 	label: 'हिंदी',
		// 	lang: 'hi',
		// 	parameters: {
		// 		tag: 'hi',
		// 	},
		// },
		// {
		// 	label: 'Dansk',
		// 	lang: 'da',
		// 	parameters: {
		// 		tag: 'da',
		// 	},
		// },
		// {
		// 	label: 'Українська',
		// 	lang: 'uk',
		// 	parameters: {
		// 		tag: 'uk',
		// 	},
		// },
	],
	files: [
		{
			include: ['src/content/i18n/en.json'],
			pattern: 'src/content/i18n/@tag.json',
			type: 'dictionary',
		},
		{
			include: ['starlight-sidebar/en.json'],
			pattern: 'starlight-sidebar/@tag.json',
			type: 'dictionary',
		},
		{
			include: ['src/content/docs/en/**/*.(md|mdx)'],
			exclude: ['src/content/docs/en/typedoc/**/*.(md|mdx)'],
			pattern: 'src/content/docs/@lang/@path',
			type: 'universal',
		},
	],
	tracking: {
		localizableProperty: 'i18nReady',
		ignoredKeywords: [
			'lunaria-ignore',
			'typo',
			'en-only',
			'broken link',
			'i18nReady',
			'i18nIgnore',
		],
	},
});
